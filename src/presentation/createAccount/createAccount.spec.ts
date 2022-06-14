import { MissingParamError } from "../errors/MissingParamError";
import { badRequest } from "../helpers/http-helper";
import { CreateAccountController } from "./createAccount";


const makeSut = () => {
  const sut = new CreateAccountController();

  return { sut }
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
});