import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './Item';

@Pipe({
  name: 'itemfilter',
  pure: false,
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: Item[], filter: string): Item[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item: Item) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {Item} Item The Item to compare to the filter.
   * @param {string} filter The filter to apply.
   * @return {boolean} True if Item satisfies filters, false if not.
   */
  applyFilter(Item: Item, filter: string): boolean {
    if (Item.users.find((user) => user === filter)) {
      return true;
    }

    return false;
  }
}
