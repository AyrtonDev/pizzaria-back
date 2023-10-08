import { UpdateDataProps, UserProps } from "../../models/User"
import { GeneralId } from "../../models/DefaultResponse"
import UserRepository from "../repositories/user-repository"

export type searchProps = {
    id?: GeneralId
    email?: string
    document?: number
}

export default class UserServices {

    async create (user: UserProps, UserRepository: UserRepository): Promise<UserProps| Error> {
        const hasUserCPF = await UserRepository.one({ document: user.document })
        const hasUserEmail = await UserRepository.one({ email: user.email })

        if (!hasUserCPF && !hasUserEmail) {
            const hash = await Bun.password.hash(user.password)
            const newUser = UserRepository.create()

            newUser.name = user.name
            newUser.email = user.email
            newUser.password = hash
            newUser.address = user.address
            newUser.document = user.document
            newUser.phone = user.phone

            return await UserRepository.save(newUser)
        } else {
            return new Error('CPF or Email is already register')
        }
    }

    async one (search: searchProps, UserRepository: UserRepository): Promise<UserProps | Error> {
        const user = await UserRepository.one(search)

        if (user === null) {
            return new Error('User not found')
        } else {
            return user
        }
    }

    async match (password: string, encrypted: string): Promise<boolean> {
        return await Bun.password.verify(password, encrypted)
    }

    async updatePassword (password: string, email: string, UserRepository: UserRepository): Promise<UserProps | Error> {
        const user = await UserRepository.one({ email })

        if (user instanceof Error) return user

        if (user === null) throw new Error('User not found')
        
        const hash = await Bun.password.hash(password)
        user.password = hash

        return await UserRepository.save(user)
    }

    async update (email: string, newDataUser: UpdateDataProps, UserRepository: UserRepository): Promise<UserProps | Error> {
        const user = await UserRepository.one({ email })

        if (user instanceof Error) return user

        if (user === null) throw new Error('User not found')

        user.name = newDataUser.name
        user.address = newDataUser.address
        user.phone = newDataUser.phone

        return await UserRepository.save(user)
    }
}