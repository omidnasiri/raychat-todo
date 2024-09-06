import { User } from "./user.model";

export interface UserRepository {
  findById(id: string): Promise<User> | null;
  findByUsername(username: string): Promise<User> | null;
  insert(username: string, password: string): Promise<User>;
}