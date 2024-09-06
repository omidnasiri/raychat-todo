
import { List } from "src/list/domain/list.model";
import { Todo } from "./todo.model";

export interface TodoRepository {
  findByTitleAndListId(title: string, listId: string): Promise<Todo> | null;
  insert(title: string, description: string, priority: number, list: List): Promise<Todo>;
}