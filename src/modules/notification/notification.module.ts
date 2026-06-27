import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { NotificationController } from "./controller/notification.controller";
import { NotificationService } from "./service/notification.service";
import { NotificationRepository } from "./repositories/notification.repository";
import { Notification } from "./entities/notification.model";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
    ]),
    UserModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule { }
