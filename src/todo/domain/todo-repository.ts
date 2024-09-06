import { TodoList } from "./model/todo-list.model";

export interface TodoRepository {
  findByTitleAndUserId(title: string, userId: string): Promise<TodoList> | null;
  insert(title: string, userId: string): Promise<TodoList>;
}