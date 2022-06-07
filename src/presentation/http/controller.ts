import { httpRequest, httpResponse } from "./http";

export interface Controller {
  handle(request: httpRequest): Promise<httpResponse>;
}