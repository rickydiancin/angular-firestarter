import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (!query) {
            return array;
        } else {
            return _.filter(array, row => row.productTitle.toString().toLowerCase().indexOf(query) > -1 || row.productCode.toString().toLowerCase().indexOf(query) > -1);
        }
    }
}