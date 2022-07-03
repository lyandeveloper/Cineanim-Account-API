import { ServerError } from "../errors/ServerError"
import { httpResponse } from "../http/http"

export const badRequest = (error: Error): httpResponse => ({
  status: 400,
  body: error
})

export const serverError = (): httpResponse => ({
  status: 500,
  body: new ServerError()
})

export const success = (body: any): httpResponse => ({
  status: 201,
  body
})