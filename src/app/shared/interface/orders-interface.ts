import { IGoodsResponse } from './goods-interface';

export interface IOrderRequest {
  userName: string;
  phoneNumber: string;
  paymentMethod: string;
  pickUpAddress: string;
  userEmail: string;
  orderStatus: string;
  orderProducts: Array<IGoodsResponse>;
  orderNumber: number;
  userComment: string;
  img?: string;
  methodDelivery: string;
  priseProd?: number;
}


export interface IOrderResponse extends IOrderRequest {
  id: string;
}

