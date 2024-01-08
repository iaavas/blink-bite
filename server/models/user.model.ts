import { Article } from "./product.model";
import { Comment } from "./comment.model";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}
