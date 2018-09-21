import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'getObjectValues'})
export class GetObjectValuesPipe implements PipeTransform {
    transform(obj: Object): any[] {
        console.log(obj);
        let result = [];

        let objKeys = Object.keys(obj);

        for (let key of objKeys) {
            result.push(obj[key]);
        }

        return result;
    }
}