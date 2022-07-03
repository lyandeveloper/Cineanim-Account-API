import { User } from "../../../core/entities/User";
import { CreateAccountDTO } from "../../../core/usecases/createAccount/dtos/createAccountDTO";

export interface DbCreateAccountRepository {
    create(user: CreateAccountDTO): Promise<User>;
}