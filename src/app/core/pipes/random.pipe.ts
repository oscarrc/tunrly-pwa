import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'random'
})
export class RandomPipe implements PipeTransform {
    transform(values: Array<any>): any {
        const length = values ? values.length : 0
        const rand = Math.floor(Math.random() * length);
        return values ? values[rand] : undefined;
    }
}
