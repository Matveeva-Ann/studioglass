
export interface ICategoryRequest {
  name: string;
  description: string;
  path: string;
  img: string;
  banner: string;
  nameBth?: any;
}

export interface ICategoryResponse extends ICategoryRequest {
  id: string;
}