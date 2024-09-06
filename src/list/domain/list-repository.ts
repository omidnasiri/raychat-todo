import { List } from "./list.model";

export interface ListRepository {
  findById(id: string): Promise<List> | null;
  findByTitleAndUserId(title: string, userId: string): Promise<List> | null;
  insert(title: string, userId: string): Promise<List>;
}