export interface Catalog {
    id: number,
    catName: string,
    pathName: string,
    children: Map<number, Catalog> | null
}