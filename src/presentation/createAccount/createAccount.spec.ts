import { CreateAccountController } from "./createAccount";

describe('CreateAccount', () => {
  it('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: { 
        email: 'any_email',
        password: 'any_password'
      }
    }
    const sut = new CreateAccountController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.status).toEqual(400)
    expect(httpResponse.body.error).toEqual("name is required")
  });
});