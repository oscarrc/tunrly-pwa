import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../../services/loading.service';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AvailabilityValidator } from '../../../../../core/validators/availability.validator';
import { PasswordValidator } from '../../../../../core/validators/password.validator';
import { FileValidator } from '../../../../../core/validators/file.validator';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit, OnDestroy {

    userProfile: any;
    edit: boolean = false;
    profileForm: any;
    imageForm: any;
    imageSubmitted: boolean = false;
    files: FileList;
    profileSubmitted: boolean = false;
    profileLoading: boolean = false;
    passwordForm: any;
    passwordSubmitted: boolean = false;
    passwordLoading: boolean = false;

    private userSubscription: Subscription;
    
    constructor(private loadingService: LoadingService, private userService: UserService) { }

    toggleEdit(){
        this.profileSubmitted = false;
        this.edit = !this.edit;        
        this.profileForm.enable();
    }

    initProfileForm(user){
        this.profileForm = new FormGroup({
            email: new FormControl({value: user.email, disabled: true}, [
                    Validators.required,
                    Validators.email
                ]
            ),
            
            firstname: new FormControl(user.firstname, [
                Validators.required
            ]),
            lastname: new FormControl(user.lastname, [
                Validators.required
            ]),
            username: new FormControl(user.username, [
                    Validators.required,
                    Validators.pattern('^([a-z0-9]+(?:[ _.-][a-z0-9]+)*){5,15}$')
                ],
                // AvailabilityValidator.checkAvailability(this.userService)
            ),
            country: new FormControl(user.country),
        });

        this.profileForm.disable();

        this.profileForm.get('username').valueChanges.subscribe( username => {
            if(username != this.userProfile.username){
                this.profileForm.get('username').setAsyncValidators(AvailabilityValidator.checkAvailability(this.userService));
            }else{
                this.profileForm.get('username').clearAsyncValidators(AvailabilityValidator.checkAvailability(this.userService));
            }
        })
    }

    initPasswordForm(){
        this.passwordForm = new FormGroup({            
                oldpassword: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$')
                ]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$')
                ]),
                repeatpassword: new FormControl('', [
                    Validators.required
                ])
            }, PasswordValidator.checkPassword() );
    }

    saveProfile(profile){
        this.profileSubmitted = true;
        
        if (profile.invalid) {
            return false;
        }
        this.profileLoading = true;

        this.userService.update(profile.value).subscribe(
            res => {
                profile.disable();
                this.userService.set(res);
                this.toggleEdit();
            },
            err => {
                console.log(err)
            }
        ).add( () => this.profileLoading = false )
    }

    changePassword(passwords){
        this.passwordSubmitted = true;
        
        if (passwords.invalid) {
            return false;
        }

        this.passwordLoading = true;

        this.userService.updatePassword(passwords.controls.oldpassword.value, passwords.controls.password.value).subscribe(
            res => {
                this.passwordSubmitted = false;
                passwords.reset();
            },
            err => {
                console.log(err)
            }
        ).add(() => this.passwordLoading = false)
    }

    initImageForm(){
        this.imageForm = new FormGroup({
            image: new FormControl()
        });
    }

    imageToBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });        
    }

    async saveImage(files: FileList){
        let image: any;

        this.files = files;
        this.imageSubmitted = true;
        this.imageForm.get('image').setValidators([
            FileValidator.fileExtensions(['png', 'jpg']),
            FileValidator.maxFileSize(this.files, 1024)
        ]);

        this.imageForm.get('image').updateValueAndValidity();

        if (this.imageForm.invalid) {
            return false;
        }

        if(this.imageForm.get('image').value){
            image = await this.imageToBase64(this.files[0])
        }

        this.userService.update({image: image}).subscribe(
            res => {
                this.userService.set(res);
            },
            err => {
                console.log(err)
            }
        )
    }   

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            this.initProfileForm(user);
            this.userProfile = user;
        });
        
        this.initImageForm();
        this.initPasswordForm();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
