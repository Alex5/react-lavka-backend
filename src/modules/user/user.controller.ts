import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
}
