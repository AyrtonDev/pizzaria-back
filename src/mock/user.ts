import AuthRepository from "../app/repositories/user-repository"

export const userMockData: any = [{
    ['_id']: '12345',
    name: 'Test',
    email: 'test@test.com.br',
    password: 'password',
    document: 99999999999,
    phone: 99999999999,
    address: {
        street: 'test',
        district: 'test',
        number: '9',
        complement: '',
        zipcode: 99999999
    },
    favoritePizzas: []
}]

export const userMockBlank: any = {
    name: '',
    email: '',
    password: '',
    address: {
        district: '',
        number: '',
        street: '',
        zipcode: 0,
        complement: ''
    },
    document: 0,
    phone: 0,
    favoritePizzas: []
}

export const userMockMethod: AuthRepository = {
    create() {
        return userMockBlank
    },
    async all() {
        return await userMockData
    },
    one({ id, email, document}) {
        if (email === 'invalid') {
            return null
        } else if (document === 0) {
            return null
        } else {
            return userMockData[0]
        }
    },
    save(data: any) {
        return {...data, _id: '123456'}
    }

}