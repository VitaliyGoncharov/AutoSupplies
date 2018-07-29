export const PROFILE_PROPS = {
    email: "Email",
    name: "Name",
    surname: "Surname",
    gender: "Gender",
    birth: "Birthday",
    delivery_address: "Delivery address (by default)",
    phone: "Phone number"
};

export interface ProfileProps {
    email: string,
    name: string,
    surname: string,
    gender: string,
    birth: string,
    delivery_address: string,
    phone: string
}