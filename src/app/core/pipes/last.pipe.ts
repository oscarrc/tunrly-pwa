import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'last'
})
export class LastPipe implements PipeTransform {
    transform(values: Array<any>): any {
        const length = values ? values.length : 0
        
        if(length > 0){
            return values[length - 1]
        }

        return undefined;
    }
}
