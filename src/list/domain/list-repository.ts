import { List } from "./list.model";

export interface ListRepository {
  findByTitleAndUserId(title: string, userId: string): Promise<List> | null;
  insert(title: string, userId: string): Promise<List>;
}