import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFilter',
  pure: false
})
export class TextFilterPipe implements PipeTransform {
  transform(
    items: any[],
    { key, filterText, mode }: { key: string; filterText: string; mode: string }
  ): any {
    if (!items || !key || !filterText) {
      return items;
    }
    if (mode === 'include') {
      return items.filter(item =>
        item[key].toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (mode === 'match') {
      return items.filter(
        item => item[key].toLowerCase() === filterText.toLowerCase()
      );
    }
  }
}
