import { User } from "@root/modules/users/entities/user.model";

export class CreateNotificationDto{
    user: User;
    message: string;
}