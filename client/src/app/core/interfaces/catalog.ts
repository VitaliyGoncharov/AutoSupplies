export interface Catalog {
    id: number,
    parentId: number,
    catName: string,
    pathName: string,
    childs: Array<Catalog>
}