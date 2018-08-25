import { Item } from "./item";
import { Customer } from "./customer";

export interface Order {
    id: number,
    address: string,
    total: number,
    status: number | string,
    updatedAt: string,
    createdAt: string,
    products: Array<{product: Item, amount: number}>,
    customer: Customer
}