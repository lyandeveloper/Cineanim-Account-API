import { Controller } from "../http/controller";
import { httpRequest, httpResponse } from "../http/http";

export class CreateAccountController implements Controller {
  constructor() {}

  async handle(request: httpRequest): Promise<httpResponse> {
    const requiredFields = ['name', 'email', 'password'];

    for(let field of requiredFields) {
      if(!request.body[field]) {
        return {
            status: 400,
            body: {
              error: `${field} is required`
            }
          }
        }
      }
  }
} 