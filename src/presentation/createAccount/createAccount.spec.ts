import { User } from "../../core/entities/User";
import { CreateAccount } from "../../core/usecases/createAccount/createAccount";
import { CreateAccountDTO } from "../../core/usecases/createAccount/dtos/createAccountDTO";
import { MissingParamError } from "../errors/MissingParamError";
import { badRequest, serverError, success } from "../helpers/http-helper";
import { CreateAccountController } from "./createAccount";


const makeCreateAccount = () => {
  class CreateAccountStub extends CreateAccount {
    public async create(user: CreateAccountDTO): Promise<User> {
      const fakeData = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        createdAt: 'any_create_at',
        updatedAt: 'any_updated_at'
      }

      return new Promise(resolve  => resolve(fakeData))
    }

  }

  return new CreateAccountStub();
}

const makeFakeData = () => {
  return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        createdAt: 'any_create_at',
        updatedAt: 'any_updated_at'
  }
}

const makeSut = () => {
  const createAccount = makeCreateAccount()
  const sut = new CreateAccountController(createAccount);

  return { sut, createAccount }
}

describe('CreateAccount', () => {
  it('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: { 
        email: 'any_email',
        password: 'any_password'
      }
    };
    const { sut } = makeSut();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')));
  });

  it('should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: { 
        name: 'any_name', 
        password: 'any_password'
      }
    }
    const { sut } = makeSut();
    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  });

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: { 
        name: 'any_name', 
        email: 'any_email'
      }
    }
    const { sut } = makeSut();
    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  });

  it('should return 500 if CreateAccount throws', async () => {
    const httpRequest = {
      body: { 
        name: 'any_name', 
        email: 'any_email',
        password: 'any_password'
      }

    }
    const { sut, createAccount } = makeSut();
    jest.spyOn(createAccount, 'create').mockImplementationOnce(
      async () => new Promise((resolve, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse).toEqual(serverError())
  });

  it('should return 201 if correct data is provided', async () => {
    const httpRequest = {
      body: { 
        name: 'any_name', 
        email: 'any_email',
        password: 'any_password'
      }

    }
    const { sut } = makeSut(); 

    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse).toEqual(success(makeFakeData()))
  });
});