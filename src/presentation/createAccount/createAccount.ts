import { CreateAccount } from "../../core/usecases/createAccount/createAccount";
import { MissingParamError } from "../errors/MissingParamError";
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../http/controller";
import { httpRequest, httpResponse } from "../http/http";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccount: CreateAccount) {}

  async handle(request: httpRequest): Promise<httpResponse> {

    try {
      const requiredFields = ['name', 'email', 'password'];

      for(let field of requiredFields) {
        if(!request.body[field]) {
          return badRequest(new MissingParamError(field))
        } 
      }

      const { name, email, password } = request.body;
      const account = await this.createAccount.create({
        name,
        email,
        password
      })

      return {
        status: 201,
        body: account
      }
    } catch(error) {
      console.error(error);
      
      return {
        status: 500,
        body: 'serverError'
      }
    }
  }
} 