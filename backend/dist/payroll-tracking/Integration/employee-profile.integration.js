"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileIntegrationService = void 0;
const common_1 = require("@nestjs/common");
let EmployeeProfileIntegrationService = class EmployeeProfileIntegrationService {
    async getEmployeeById(employeeId) {
        return {
            id: employeeId,
            fullName: 'Demo Employee',
            email: 'demo.employee@example.com',
            employeeCode: 'EMP-0001',
            departmentId: '0000000000000000000000aa',
            positionId: '0000000000000000000000bb',
        };
    }
};
exports.EmployeeProfileIntegrationService = EmployeeProfileIntegrationService;
exports.EmployeeProfileIntegrationService = EmployeeProfileIntegrationService = __decorate([
    (0, common_1.Injectable)()
], EmployeeProfileIntegrationService);
//# sourceMappingURL=employee-profile.integration.js.map