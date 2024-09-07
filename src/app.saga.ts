import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from "rxjs";
import { ListDeletedEvent } from "./list/domain/event/list-deleted.event";
import { BulkDeleteTodoByListCommand } from "./todo/application/command/bulk-delete-todo-by-list.command";

@Injectable()
export class AppSaga {
  @Saga()
  listDeleted = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(ListDeletedEvent),
        map(event => {
          return new BulkDeleteTodoByListCommand(event.id,);
        }),
      );
  }
}