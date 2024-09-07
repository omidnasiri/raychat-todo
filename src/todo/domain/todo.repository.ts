
import { List } from "src/list/domain/list.model";
import { Todo } from "./todo.model";

export interface TodoRepository {
  findByListId(listId: string): Promise<Todo[]>;
  findByTitleAndListId(title: string, listId: string): Promise<Todo> | null;
  insert(title: string, description: string, priority: number, list: List): Promise<Todo>;
  bulkDeleteByListId(listId: string): Promise<void>;
  findByIdAndDelete(id: string): Promise<Todo> | null;
  findByIdAndUpdate(id: string, title: string, description: string, priority: number): Promise<Todo> | null;
}