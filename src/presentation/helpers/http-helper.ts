import { httpResponse } from "../http/http"

export const badRequest = (error: Error): httpResponse => ({
  status: 400,
  body: error
})