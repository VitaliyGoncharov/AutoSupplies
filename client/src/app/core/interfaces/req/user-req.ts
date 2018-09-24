export class UserReq {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birth: string;
  gender: string;
  address: string;
  phone: string;

  constructor(email, password, firstname, lastname, birth, gender, address, phone) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birth = birth;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
  }

  static createForSignup(email, password, firstname, lastname) {
    return new this(email, password, firstname, lastname, null,null,null,null);
  }
}