import { Schema, model } from "mongoose"

export type UserProps = {
    name: string
    email: string
    password: string
    address: AddressProps
    document: number
    phone: number
    favoritePizzas: string[] | never[]
}

type AddressProps = {
    street: string
    district: string
    number: number
    zipcode: number
    complement?: string
}

const schema = new Schema<UserProps>({
    name: String,
    email: String,
    password: String,
    phone: Number,
    address: {
        street: String,
        district: String,
        number: Number,
        zipcode: Number,
        complement: {type: String, required: false}
    },
    document: Number,
    favoritePizzas: [String]
})

export default model<UserProps>('Users', schema)