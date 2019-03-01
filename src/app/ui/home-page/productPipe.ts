import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        let result = [];
        if (!query) {
            return;
        } else {
            let result = _.filter(array, row => row.productTitle.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 || row.productCode.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 || row.categoryName.toString().toLowerCase().indexOf(query.toLowerCase()) > -1);
            if(result.length > 0) {
                return result;
            } else {
                return [-1]
            }
        }
    }
}