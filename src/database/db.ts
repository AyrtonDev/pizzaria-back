import { connect, disconnect } from "mongoose"

const URI = Bun.env.URI_MONGODB_CONNECT as string

export const mongoConnect = async () => {
    try {
        await connect(URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export const mongoDisconnect = async () => {
    console.log('MongoDB is disconnecting...')
    await disconnect()
}