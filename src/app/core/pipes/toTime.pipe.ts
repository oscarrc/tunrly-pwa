import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

    transform(value: number): string {
        value = value ? Number(value) : 0;
        var h = Math.floor(value / 3600);
        var m = Math.floor(value % 3600 / 60);
        var s = Math.floor(value % 3600 % 60);
    
        var hours = h < 10 ? '0' + h : h;
        var minutes = m < 10 ? '0' + m : m;
        var seconds = s < 10 ? '0' + s : s

        return (hours != "00" ? hours + ":" : "") + minutes + ":" + seconds;
    }
}