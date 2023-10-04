import User, { UserProps } from "../models/User"

export const createUser = async (user: UserProps) => {
    const hasUserCPF = await User.findOne({ document: user.document})
    const hasUserEmail = await User.findOne({ email: user.email })

    if (!hasUserCPF && !hasUserEmail) {
        const hash = await Bun.password.hash(user.password)
        const newUser = await User.create({...user, password: hash})

        return newUser
    } else {
        return new Error('CPF or Email is already register')
    }
}

export const findByEmail = async (email: string) => {
    return await User.findOne({ email })
}

export const matchPassword = async (password: string, encrypted: string) => {
    return await Bun.password.verify(password, encrypted)
}

export const changePassword = async (password: string, email: string) => {
    const user = await User.findOne({ email })

    if(user) {
        const hash = await Bun.password.hash(password)
        user.password = hash

        return await user.save()
    } else {
        return new Error('Error to find user')
    }
}

export const changeDataUser = async (newDataUser: UserProps) => {

}