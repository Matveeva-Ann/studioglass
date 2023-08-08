
export interface ICategoryRequest {
  name: string;
  description: string;
  path: string;
  img: string;
  banner: string;
}

export interface ICategoryResponse extends ICategoryRequest {
  id: string;
}