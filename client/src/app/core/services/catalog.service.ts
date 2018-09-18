import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CatalogRes } from "../interfaces/res/catalog";
import { Catalog } from "../interfaces/catalog";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    private GET_CATALOGS = "/api/catalogs";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Array<CatalogRes>>(this.GET_CATALOGS);
    }

    getTree(dataset: Array<CatalogRes>): Map<number, Catalog> {
        let tree: Map<number, Catalog> = new Map();

        for(let node of dataset) {
            if (!node.parentId) {
                tree.set(node.id, this.toCatalog(node));
            } else {
                if (tree.get(node.parentId).children == null) tree.get(node.parentId).children = new Map();
                tree.get(node.parentId).children.set(node.id, this.toCatalog(node));
            }
        }
        return tree;
    }

    // getTreeFromRoot(dataset: Array<CatalogRes>, root: string): Map<number, Catalog> {
    //     let tree: Map<number, Catalog> = new Map();

    //     for (let node of dataset) {
    //         if (node.pathName == root) {
    //             tree.set(node.id, this.toCatalog(node))
    //         } else {

    //         }
    //     }
    // }

    find(pathName: string, data: Map<number, Catalog>) {
        for (let catalog of data.values()) {
            if (catalog.pathName == pathName)
                return catalog;
        }
    }

    toCatalog(node: CatalogRes): Catalog {
        return {
            id: node.id,
            catName: node.catName,
            pathName: node.pathName,
            children: null
        }
    }
}