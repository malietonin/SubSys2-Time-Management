"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobTemplateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_template_dto_1 = require("./create-job-template.dto");
class UpdateJobTemplateDto extends (0, mapped_types_1.PartialType)(create_job_template_dto_1.CreateJobTemplateDto) {
}
exports.UpdateJobTemplateDto = UpdateJobTemplateDto;
//# sourceMappingURL=update-job-template.dtos.js.map