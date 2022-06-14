export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: string, name: string, email: string, password: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}