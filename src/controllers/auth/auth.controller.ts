import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { LoginDto } from "../../models/users/dtos/login.dto";
import { AuthService } from "../../services/auth/auth.service";


@Controller('auth')
export class AuthController{
    constructor(private readonly service: AuthService){}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() login: LoginDto): Promise<{ token: string }>{
        return await this.service.login(login);
    }
}