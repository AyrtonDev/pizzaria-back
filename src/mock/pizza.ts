export const pizzaMockData: any = [{
    ['_id']: '123456',
    name: 'test',
    available: true,
    describe: 'It is pizza time!',
    img: '',
    sizes: {
        sm: {
            available: true,
            price: 20,
        },
        md: {
            available: true,
            price: 25
        },
        lg: {
            available: true,
            price: 30
        }
    }
}]

export const pizzaMockNew: any = {
    name: 'Test',
    available: false,
    describe: 'It is other pizza time!',
    img: '',
    sizes: {
        sm: {
            available: false,
            price: 0
        },
        md: {
            available: false,
            price: 0
        },
        lg: {
            available: false,
            price: 0
        }
    }
}

export const pizzaMockBlank: any = {
    ['_id']: '123456',
    name: '',
    available: false,
    describe: '',
    img: '',
    sizes: {
        sm: {
            available: false,
            price: 0,
        },
        md: {
            available: false,
            price: 0
        },
        lg: {
            available: false,
            price: 0
        }
    }
}

export const pizzaMockMethod = {

    all() {
        return pizzaMockData
    },

    one(id: string) {
        if (id === 'invalid') {
            return null
        } else {
            return pizzaMockData[0]
        }
    },

    create() {
        return pizzaMockBlank
    },

    save(data: any) {
        return data
    },

    delete(data: any) {
        return data
    },
}