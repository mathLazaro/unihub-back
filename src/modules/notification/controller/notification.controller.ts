import { Controller, Get, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { NotificationService } from "../service/notification.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "@root/shared/guards/auth.guard";
import { ViewNotification } from "../dtos/view-notification.dto";
import { CurrentUserId } from "@root/shared/decorators/current-user.decorator";

@Controller()
export class NotificationController{
    constructor(private readonly service: NotificationService){ }

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Get('/find-all')
    async findAll(
        @CurrentUserId() userId: string
    ): Promise<ViewNotification[]> {
        return await this.service.findByUser(userId);
    }

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Get('/has-unviewed')
    async hasUnviewed(
        @CurrentUserId() userId: string
    ): Promise<boolean> {
        return await this.service.hasUnviewed(userId);
    }

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Patch('/:id/viewed')
    async viewed(
        @Param('id') id: string
    ): Promise<void> {
        return await this.service.viewed(id);
    }

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Patch('/viewed-all')
    async viewedAll(
        @CurrentUserId() userId: string
    ): Promise<void> {
        return await this.service.viewedAll(userId);
    }
}