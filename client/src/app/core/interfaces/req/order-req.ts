import { ItemCookie } from "../cookie/item-cookie";

export interface OrderReq {
    name: string,
    phone: string,
    address: string,
    products: Array<ItemCookie>
}