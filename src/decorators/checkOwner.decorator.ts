import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';

export function Owner() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
  );
}