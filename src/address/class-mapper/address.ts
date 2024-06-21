export class AddressMapper {
  complements: string;
  numberAddress: number;
  cep: string;
  city: any;

  constructor(
    complements: string,
    numberAddress: number,
    cep: string,
    city: any,
  ) {
    this.complements = complements;
    this.numberAddress = numberAddress;
    this.cep = cep;
    this.city = city;
  }
}
