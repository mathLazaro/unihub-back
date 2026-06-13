import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/auth.strategy";
import { jwtConfig } from "@root/config/jwt.config";
import { UserModule } from "../users/user.module";


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],

})
export class AuthModule {

}
