import { Controller, Post, Get, Body } from '@nestjs/common';
import { EscalationService } from './escalation.service';

@Controller('escalation')
export class EscalationController {
  constructor(private readonly service: EscalationService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
