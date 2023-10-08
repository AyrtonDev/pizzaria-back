import User, { UserProps } from "../../models/User";
import { GeneralId } from "../../models/DefaultResponse";
import { searchProps } from "../services/user-services";
import { Error } from "mongoose";

export default class AuthRepository {
    async all (): Promise<UserProps[] | never[]> {
        return await User.find({})
    }

    async one (search: searchProps): Promise<UserProps | null | Error> {
        if (search.email) {
            return await User.findOne({ email: search.email })
        } else if (search.document) {
            return await User.findOne({ document: search.document })
        } else {
            try {
                return await User.findById(search.id)
            } catch (error) {
                const err = error as Error
                console.error('ERROR: ', err)

                return new Error('User not found')
            }
        }
    }

    create(): UserProps {
        return new User()
    }

    async save (data: UserProps): Promise<UserProps>  {
        return await data.save()
    }
}