import { User } from "../../entities/User";
import { CreateAccountDTO } from "./dtos/createAccountDTO";

export abstract class CreateAccount {
  public abstract create(user: CreateAccountDTO): Promise<User>;
}