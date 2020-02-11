import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'homeListFilter',
    pure: false
})
export class HomeListPipe implements PipeTransform {
    transform(items: any[], list: Array<any>): any {
        if (!items || !list) {
            return items;
        }
        return items.filter(item => list.find(l => l.name === item.name && l.checked));
    }
}