import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { OrganizationStructureService } from './organization-structure.service';

@Controller('organization-structure')
export class OrganizationStructureController {
  constructor(
    private readonly organizationStructureService: OrganizationStructureService,
  ) {}

  //departments

  @Post('departments')
  createDepartment(@Body() dto: any) {
    return this.organizationStructureService.createDepartment(dto);
  }

  @Get('departments')
  getAllDepartments() {
    return this.organizationStructureService.getAllDepartments();
  }

  @Get('departments/:id')
  getDepartmentById(@Param('id') id: string) {
    return this.organizationStructureService.getDepartmentById(id);
  }

  @Put('departments/:id')
  updateDepartment(@Param('id') id: string, @Body() dto: any) {
    return this.organizationStructureService.updateDepartment(id, dto);
  }

  @Patch('departments/:id/deactivate')
  deactivateDepartment(@Param('id') id: string) {
    return this.organizationStructureService.deactivateDepartment(id);
  }
  //positions

  @Post('positions')
  createPosition(@Body() dto: any) {
    return this.organizationStructureService.createPosition(dto);
  }

  @Get('positions')
  getAllPositions() {
    return this.organizationStructureService.getAllPositions();
  }

  @Get('positions/:id')
  getPositionById(@Param('id') id: string) {
    return this.organizationStructureService.getPositionById(id);
  }

  @Put('positions/:id')
  updatePosition(@Param('id') id: string, @Body() dto: any) {
    return this.organizationStructureService.updatePosition(id, dto);
  }

  @Put('positions/:id/reporting-line')
  updateReportingLine(@Param('id') id: string, @Body() dto: any) {
    return this.organizationStructureService.updateReportingLine(id, dto);
  }

  @Put('positions/:id/move')
  movePosition(@Param('id') id: string, @Body() dto: any) {
    return this.organizationStructureService.movePosition(id, dto);
  }

  @Patch('positions/:id/deactivate')
  deactivatePosition(@Param('id') id: string) {
    return this.organizationStructureService.deactivatePosition(id);
  }
  //structure change request

  @Post('change-requests')
  submitChangeRequest(@Body() dto: any) {
    return this.organizationStructureService.submitChangeRequest(dto);
  }

  @Get('change-requests')
  getAllChangeRequests() {
    return this.organizationStructureService.getAllChangeRequests();
  }

  @Get('change-requests/:id')
  getChangeRequestById(@Param('id') id: string) {
    return this.organizationStructureService.getChangeRequestById(id);
  }
}