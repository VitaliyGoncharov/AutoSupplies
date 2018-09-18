import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'getValues'})
export class GetValuesPipe implements PipeTransform {
    transform(map: Array<any>): any[] {
        console.log(map);
        let result = [];

        for (let entry of map) {
            result.push({
                key: entry[0],
                val: entry[1]
            });
        }

        return result;
    }
}