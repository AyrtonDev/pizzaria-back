import { Types } from "mongoose"

export type GeneralId = string | Types.ObjectId

export class ResponseDefault<T> {
    status: boolean
    message: string | undefined
    data: T | null

    constructor(status: boolean, message: string, data: T | null) {
        this.status = status;
        this.message = message,
        this.data = data
    }
}
