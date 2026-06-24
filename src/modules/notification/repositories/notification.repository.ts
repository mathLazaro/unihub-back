import { Inject, Injectable } from "@nestjs/common";
import { BaseRepository } from "@root/shared/core/base.repository";
import { Notification } from "../entities/notification.model";
import { Repository } from "typeorm";
import { User } from "@root/modules/users/entities/user.model";

@Injectable()
export class NotificationRepository extends BaseRepository<Notification>{
    constructor(
        @Inject(Notification)
        protected readonly repository: Repository<Notification>,
    ){
        super(repository);
    }

    async save(notification: Notification): Promise<void>{
        await this.repository.save(notification);
    }

    async saveAll(notifications: Notification[]): Promise<void>{
        await this.repository.save(notifications);
    }

    async findByUser(user: User): Promise<Notification[]>{
        return await this.repository.find({
            where: { user: { id: user.id } },
        });
    }

    async hasUnviewed(user: User): Promise<boolean>{
        const count = await this.repository.count({
            where: { 
                user: { id: user.id },
                viewed: false,
            },
        });
        return count > 0;
    }

    async viewedAllByUser(user: User): Promise<void>{
        await this.repository.update(
            { user: { id: user.id }, viewed: false },
            { viewed: true, viewed_at: new Date() }
        );
    }
}