import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class BaseRepository<T extends BaseEntity> {

  constructor(
    protected readonly repository: Repository<T>,
  ) { }

  async findByIdOrThrow(id: string): Promise<T> {
    const entity = await this.repository.findOneBy({ id } as any);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
