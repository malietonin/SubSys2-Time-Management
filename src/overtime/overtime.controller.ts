 import { Controller, Get, Post, Body } from '@nestjs/common';
import { OvertimeService } from './overtime.service';

@Controller('overtime')
export class OvertimeController {
  constructor(private readonly service: OvertimeService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
