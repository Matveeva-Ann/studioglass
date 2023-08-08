
export interface IGoodsRequest {
  category: string;
  name: string;
  description: string;
  code: string;  
  price: number;
  path: string;
  size: string;
  img: string;
  count: number;
}

export interface IGoodsResponse extends IGoodsRequest {
  id: string;
}