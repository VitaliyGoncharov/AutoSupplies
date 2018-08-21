import { Item } from "./item";

export interface Order {
    id: number,
    address: string,
    total: number,
    status: number,
    updatedAt: string,
    createdAt: string,
    products: Array<{product: Item, amount: number}>
}