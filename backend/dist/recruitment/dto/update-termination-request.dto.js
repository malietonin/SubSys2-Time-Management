"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTerminationRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_termination_request_dto_1 = require("./create-termination-request.dto");
class UpdateTerminationRequestDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_termination_request_dto_1.CreateTerminationRequestDto, ['employeeId', 'contractId'])) {
}
exports.UpdateTerminationRequestDto = UpdateTerminationRequestDto;
//# sourceMappingURL=update-termination-request.dto.js.map