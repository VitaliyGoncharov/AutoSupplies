import { Item } from "./item";
import { Customer } from "./customer";
import { ItemContainer } from "./item-container";

export interface Order {
    id: number,
    address: string,
    total: number,
    status: number | string,
    updatedAt: string,
    createdAt: string,
    products: Array<ItemContainer>,
    customer: Customer
}