export class NewUser {
  private id: number;
  private name: string;
  private email: string;
  private phone: string;
  private cpf: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;

    this.phone = phone;
    this.cpf = cpf;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      cpf: this.cpf,
    };
  }
}
