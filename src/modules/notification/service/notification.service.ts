import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification.repository";
import { User } from "@root/modules/users/entities/user.model";
import { PostType } from "@root/modules/posts/enums/post-type.enum";
import { NotificationMessages } from "../utils/messages.record";
import { Notification } from "../entities/notification.model";
import { UserRepository } from "@root/modules/users/repositories/user.repository";
import { ViewNotification } from "../dtos/view-notification.dto";

@Injectable()
export class NotificationService{
    constructor(
        private readonly repository: NotificationRepository,
        private readonly userRepository: UserRepository
    ){ }

    async create(postType: PostType): Promise<void>{
        const message = NotificationMessages.getByType(postType);

        const allUsersToNotificate = await this.userRepository.findAllUsersToNotificate(postType);

        const notifications = allUsersToNotificate.map(user => new Notification(user, message));

        await this.repository.saveAll(notifications);
    }

    async findByUser(userId: string): Promise<ViewNotification[]>{
        const user = await this.userRepository.findByIdOrThrow(userId);

        let notifications = await this.repository.findByUser(user);

        return notifications.map(notification => new ViewNotification(notification));
    }

    async hasUnviewed(userId: string): Promise<boolean>{
        const user = await this.userRepository.findByIdOrThrow(userId);
        return this.repository.hasUnviewed(user);
    }

    async viewed(id: string): Promise<void>{
        const notification = await this.repository.findByIdOrThrow(id);
        
        notification.setViewed();

        await this.repository.save(notification);
    }
    
    async viewedAll(userId: string): Promise<void>{
        const user = await this.userRepository.findByIdOrThrow(userId);
        await this.repository.viewedAllByUser(user);
    }
}