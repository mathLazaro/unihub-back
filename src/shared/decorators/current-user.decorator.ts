import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    return userId;
  },
);
