import { NamedModel } from './../model/named-model';
import { Pipe, PipeTransform } from '@angular/core';
import { ZonaDto } from 'src/app/model/zona-dto';

@Pipe({
    name: 'namefilter',
    pure: false
})
export class ModelNamedFilterPipe implements PipeTransform {

    transform(items: NamedModel[], filter: NamedModel): NamedModel[] {

        if (!items || !filter) {
            return items;
        }
        return items.filter((item: NamedModel) => this.applyFilter(item, filter));
    }

    applyFilter(zona: NamedModel, filter: NamedModel): boolean {
        for (let field in filter) {
            if (filter[field]) {
                if (typeof filter[field] === 'string') {
                    if (zona[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                    }
                } else if (typeof filter[field] === 'number') {
                    if (zona[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

}