import { Prop } from "./prop";

export interface Item {
    /* This keys comes from server */
    id: number,
    title: string,
    image: string,
    price: number,
    description: string
    properties: Array<Prop>
}