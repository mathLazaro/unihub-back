
import { User } from "@root/modules/users/entities/user.model";
import { BaseEntity } from "@root/shared/core/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('notifications')
export class Notification extends BaseEntity{

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ default: false })
    viewed: boolean;

    @Column({ nullable: true })
    viewed_at: Date | null;

    @Column()
    message: string;

    constructor(user?: User, message?: string){
        super();
        if(user && message){
            this.user = user;
            this.viewed = false;
            this.viewed_at = null;
            this.message = message;
        }
    }

    setViewed(): void{
        this.viewed = true;
        this.viewed_at = new Date();
    }
}