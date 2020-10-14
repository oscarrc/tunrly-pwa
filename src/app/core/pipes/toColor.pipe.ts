import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toColor'
})
export class ToColorPipe implements PipeTransform {
    transform(value: any): string {
        let hash = 0;
        let str = value.toString();

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
    
        return "#00000".substring(0, 7 - c.length) + c;
    }
}
