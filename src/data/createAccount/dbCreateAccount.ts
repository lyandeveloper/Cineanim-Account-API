import { User } from "../../core/entities/User";
import { CreateAccountDTO } from "../../core/usecases/createAccount/dtos/createAccountDTO";
import { DbCreateAccountRepository } from "./protocols/dbCreateAccountRepository";

export class DbCreateAccount implements DbCreateAccountRepository {
    constructor(private readonly createAccount: DbCreateAccountRepository) {} 

    async create(user: CreateAccountDTO): Promise<User> {
        const data = await this.createAccount.create(user)
        return data
    }
    
}