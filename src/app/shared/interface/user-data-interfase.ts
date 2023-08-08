
export interface IUserDataRequest {
  name: string;
  email: string;
  phoneNumber: number;
  orders: Array<string>,
  role: string,
  img: string;
  banner: string;
  address?: Array<string> | any;
}

export interface IUserDataResponse extends IUserDataRequest {
  id: string;
}
