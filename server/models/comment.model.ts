import { Article } from "./product.model";

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  article?: Article;
}
