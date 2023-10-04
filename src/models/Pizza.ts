import { Schema, model } from "mongoose"

export type PizzaProps = {
    name: string
    available: boolean
    describe: string
    img: string
    sizes: SizesProps
}

type SizesProps = {
    sm: SizeProps
    md: SizeProps
    lg: SizeProps
    fm?: SizeProps
    e?: SizeProps 
}


type SizeProps = {
    available: boolean
    price: number
}

const schema = new Schema<PizzaProps>({
    name: String,
    available: Boolean,
    describe: String,
    img: String,
    sizes: {
        sm: {
            available: Boolean,
            price: Number
        },
        md: {
            available: Boolean,
            price: Number
        },
        lg: {
            available: Boolean,
            price: Number
        }
    }
})

export default model<PizzaProps>('Pizzas', schema)