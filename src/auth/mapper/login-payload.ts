export class LoginPayload {
  id: number;
  typeUser: number;

  constructor(id: number, typeUser: number) {
    this.id = id;
    this.typeUser = typeUser;
  }
}
