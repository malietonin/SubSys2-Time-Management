"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExecutionIntegrationService = void 0;
const common_1 = require("@nestjs/common");
let PayrollExecutionIntegrationService = class PayrollExecutionIntegrationService {
    async getPayslipById(payslipId) {
        return {
            id: payslipId,
            employeeId: '000000000000000000000001',
            periodMonth: 10,
            periodYear: 2025,
            grossSalary: 20000,
            netSalary: 17000,
            basicSalary: 15000,
            allowancesTotal: 5000,
            deductionsTotal: 3000,
        };
    }
    async getPayslipsForEmployee(employeeId) {
        const demoPayslip = {
            id: 'DEMO-PAYSLIP-ID',
            employeeId,
            periodMonth: 10,
            periodYear: 2025,
            grossSalary: 20000,
            netSalary: 17000,
            basicSalary: 15000,
            allowancesTotal: 5000,
            deductionsTotal: 3000,
        };
        return [demoPayslip];
    }
};
exports.PayrollExecutionIntegrationService = PayrollExecutionIntegrationService;
exports.PayrollExecutionIntegrationService = PayrollExecutionIntegrationService = __decorate([
    (0, common_1.Injectable)()
], PayrollExecutionIntegrationService);
//# sourceMappingURL=payroll-execution.integration.js.map