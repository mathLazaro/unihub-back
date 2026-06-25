
import { User } from "@root/modules/users/entities/user.model";
import { BaseEntity } from "@root/shared/core/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CreateNotificationDto } from "../dtos/create-notification.dto";

@Entity('notifications')
export class Notification extends BaseEntity{

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ default: false })
    viewed: boolean;

    @Column({ nullable: true, type: 'date' })
    viewed_at: string;

    @Column()
    message: string;


    setViewed(): void{
        this.viewed = true;
        this.viewed_at = new Date().toISOString();
    }
}