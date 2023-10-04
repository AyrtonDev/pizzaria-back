
export interface defaultResponse<T> {
    status: boolean
    message: string | undefined
    data?: T
}

export class responseDefault {
    status: boolean
    message: string | undefined
    data: any | null

    constructor(status: boolean, message?: string, data?: unknown) {
        this.status = status;
        this.message = message,
        this.data = data ? data : null
    }
}
