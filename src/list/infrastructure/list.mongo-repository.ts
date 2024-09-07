import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ListEntity } from "./list.entity";
import { ListRepository } from "../domain/list-repository";
import { List } from "../domain/list.model";

export class ListMongoRepository implements ListRepository {
  constructor(
    @InjectModel(ListEntity.CollectionName)
    private readonly userSchema: Model<ListEntity>
  ) {}

  async findById(id: string): Promise<List> | null {
    const listEntity = await this.userSchema.findById(id);
    return listEntity ? this.entityToModel(listEntity): null;
  }

  async findByTitleAndUserId(title: string, userId: string): Promise<List> | null {
    const listEntity = await this.userSchema.findOne({ title, userId })
    return listEntity ? this.entityToModel(listEntity): null;
  }

  async insert(title: string, userId: string): Promise<List> {
    const listEntity = new this.userSchema({ title, userId });
    return this.entityToModel(await listEntity.save());
  }

  async findByIdAndUpdate(id: string, title: string): Promise<List> | null {
    const listEntity = await this.userSchema.findByIdAndUpdate(id, { title }, { new: true });
    return listEntity ? this.entityToModel(listEntity): null;
  }

  async findByIdAndDelete(id: string): Promise<List> | null {
    const listEntity = await this.userSchema.findByIdAndDelete(id);
    return listEntity ? this.entityToModel(listEntity): null;
  }

  private entityToModel(entity: ListEntity & { _id: Types.ObjectId }): List {
    return new List(entity._id.toString(), entity.title, entity.userId);
  }
}