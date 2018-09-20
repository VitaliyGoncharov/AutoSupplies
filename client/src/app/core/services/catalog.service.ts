import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CatalogRes } from "../interfaces/res/catalog";
import { Catalog } from "../interfaces/catalog";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    catalogsDB = null;
    catalogs: Array<Catalog> = null;
    private GET_CATALOGS = "/api/catalogs";
    private GET_CATALOG_BY_ID = "/api/catalog/id/";
    private GET_CATALOGS_FROM_ROOT = "/api/catalog/list/";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.GET_CATALOGS);
    }

    getCatalog(id: number) {
        let _url = this.GET_CATALOG_BY_ID.concat(id.toString());
        return this.http.get<Catalog>(_url);
    }

    getAllFromRoot(rootCatalog) {
        let _url = this.GET_CATALOGS_FROM_ROOT.concat(rootCatalog);
        return this.http.get(_url);
    }

    /**
     * catalogs [
     *  {id: {id,parentId,title,childs: {} }},
     *  {...}
     * ]
     * 
     * @param catalogs 
     */
    convertChildsToArray(catalogs): Array<Catalog> {
        let result: Array<Catalog> = [];
        let keys = Object.keys(catalogs);
        if (!keys) return result;

        for (let key of keys) {
            if (catalogs[key].childs != null) {
                catalogs[key].childs = this.convertChildsToArray(catalogs[key].childs);
            }
            result.push(catalogs[key]);
        }
        return result;
    }
}