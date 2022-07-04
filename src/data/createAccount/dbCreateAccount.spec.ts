import { User } from "../../core/entities/User";
import { CreateAccountDTO } from "../../core/usecases/createAccount/dtos/createAccountDTO";
import { DbCreateAccount } from "./dbCreateAccount";
import { DbCreateAccountRepository } from "./protocols/dbCreateAccountRepository";

class DbCreateAccountRepositoryStub implements DbCreateAccountRepository {
    async create(user: CreateAccountDTO): Promise<User> {
        const fakeData = {
            id: 'any_id',
            name: 'any_name',
            email: 'any_email',
            password: "any_password",
            createdAt: "any_create_date",
            updatedAt: "any_update_date"
        }

        return new Promise(resolve => resolve(fakeData))
    }

}

describe('DbCreateAccount', () => {
    it('should throw if CreateAccountRepositoryStub throws', async () => {
        const dbCreateAccountStub = new DbCreateAccountRepositoryStub()
        const sut = new DbCreateAccount(dbCreateAccountStub)
        const fakeData = {
            name: "any_name",
            email: "any_email",
            password: "any_password"
        }
        
        jest
            .spyOn(dbCreateAccountStub, "create")
            .mockReturnValueOnce(
                new Promise((resolve, reject) => reject(new Error()))
            )
        const httpResponse = sut.create(fakeData) 
        
        expect(httpResponse).rejects.toThrow()
    });
});