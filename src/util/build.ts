export type updateUserProps = {
    name: string
    street: string
    district: string
    number: string
    zipcode: number
    complement?: string
    phone: number
}

export function buildAddress(data: updateUserProps) {
    return {
        name: data.name,
        phone: data.phone,
        address: {
            street: data.street,
            district: data.district,
            number: data.number,
            complement: data.complement ? data.complement : '',
            zipcode: data.zipcode 
        }
    }
}