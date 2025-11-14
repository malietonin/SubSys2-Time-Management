import { Controller, Get, Post, Body } from '@nestjs/common';
import { FalsePenaltyService } from './falsePenalty.service';

@Controller('false-penalty')
export class FalsePenaltyController {
  constructor(private readonly service: FalsePenaltyService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
