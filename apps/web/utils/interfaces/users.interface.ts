export interface IUsersResponse {
  users: IUsers[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IUsers {
  website: string;
  name: string;
  email: string;
  username: string;
  id: number;
  address: IUsersAddress;
  phone: string;
  company: IUsersCompany;
}

export interface IUsersAddress {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  userId: number;
}

export interface IUsersCompany {
  id: number;
  name: string;
  catchPhrase: string;
  bs: string;
  userId: number;
}
