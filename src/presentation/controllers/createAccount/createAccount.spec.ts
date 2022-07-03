import { User } from "../../../core/entities/User";
import { CreateAccount } from "../../../core/usecases/createAccount/createAccount";
import { CreateAccountDTO } from "../../../core/usecases/createAccount/dtos/createAccountDTO";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { MissingParamError } from "../../errors/MissingParamError";
import { badRequest, serverError, success } from "../../helpers/http-helper";
import { EmailValidator } from "../../protocols/email-validator";
import { CreateAccountController } from "./createAccount";

type SutTypes = {
  sut: CreateAccountController
  createAccount: CreateAccount
  emailValidator: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

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

const makeSut = (): SutTypes => {
  const createAccount = makeCreateAccount()
  const emailValidator = makeEmailValidator()
  const sut = new CreateAccountController(createAccount, emailValidator);

  return { sut, createAccount, emailValidator }
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

  it('should return 400 if a invalid email is provided', async () => {
    const httpRequest = {
      body: { 
        name: 'any_name', 
        email: 'invalid_email',
        password: 'any_password'
      }
    } 
    const { sut, emailValidator } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
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