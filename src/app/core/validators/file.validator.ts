import {ValidatorFn, ValidationErrors, FormControl} from '@angular/forms';

export class FileValidator {
    static fileExtensions(type: Array<string>): ValidatorFn {
        return (control: FormControl): ValidationErrors => {
            const file = control.value;

            if ( file ) {
                const extension = file.split('.')[1].toLowerCase();
                return type.includes(extension.toLowerCase()) ? null : { requiredFileType: true };
            }
        };
    };

    static maxFileSize(files: FileList, size: number): ValidatorFn {
        return (control: FormControl): ValidationErrors => {
            const file = control.value;
            if (file) {
                const fileSize = files[0].size;
                const fileSizeInKB = Math.round(fileSize / 1024);
                return fileSizeInKB <= size ? null : { requiredSize: true }
            }
        }
    }
}

