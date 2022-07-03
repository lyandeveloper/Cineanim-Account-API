import { CreateAccount } from "../../../core/usecases/createAccount/createAccount";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { MissingParamError } from "../../errors/MissingParamError";
import { badRequest, serverError, success } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller"; 
import { EmailValidator } from "../../protocols/email-validator";
import { httpRequest, httpResponse } from "../../protocols/http";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccount: CreateAccount, private readonly emailValidator: EmailValidator) {}

  async handle(request: httpRequest): Promise<httpResponse> {

    try {
      const requiredFields = ['name', 'email', 'password'];

      for(let field of requiredFields) {
        if(!request.body[field]) {
          return badRequest(new MissingParamError(field))
        } 
      }

      const { name, email, password } = request.body;

      const isValidEmail = this.emailValidator.isValid(email)

      if(!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.createAccount.create({
        name,
        email,
        password
      })

      return success(account)
    } catch(error) {
      console.error(error);

      return serverError()
    }
  }
} 