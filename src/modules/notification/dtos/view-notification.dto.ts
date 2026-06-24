import { Notification } from "../entities/notification.model";

export class ViewNotification {

    id: string;

    viewed: boolean;

    message: string;
    

    constructor(notification: Notification){
        this.id = notification.id;
        this.viewed = notification.viewed;
        this.message = notification.message;
    }
}