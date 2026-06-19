import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class BaseRepository<T extends BaseEntity> {

  constructor(
    protected readonly repository: Repository<T>,
  ) { }

  get base(): Repository<T> {
    return this.repository;
  }

  async findByIdOrThrow(id: string, includeDeleted = false): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id: id } as any,
      withDeleted: includeDeleted
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
