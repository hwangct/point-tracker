import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './Item';

@Pipe({
  name: 'itemfilter',
  pure: false,
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: Item[], filter: number): Item[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: Item) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {Item} Item The Item to compare to the filter.
   * @param {number} filter The filter to apply.
   * @return {boolean} True if Item satisfies filters, false if not.
   */
  applyFilter(Item: Item, filter: number): boolean {
    if (Item.userId.includes(filter)) {
      return true;
    }

    return false;
  }
}
