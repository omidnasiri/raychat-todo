import { List } from "./list.model";

export interface ListRepository {
  findById(id: string): Promise<List> | null;
  findByTitleAndUserId(title: string, userId: string): Promise<List> | null;
  insert(title: string, userId: string): Promise<List>;
  findByIdAndUpdate(id: string, title: string): Promise<List> | null;
  findByIdAndDelete(id: string): Promise<List> | null;
  findByUserId(userId: string): Promise<List[]>;
}