import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'homeCardBoardFilter',
    pure: false
})
export class HomeCardBoardPipe implements PipeTransform {
    transform(items: any[], boards: Array<any>): any {
        if (!items || !boards) {
            return items;
        }
        return items.filter(item => boards.find(board => board.name === item.boardName && board.checked));
    }
}