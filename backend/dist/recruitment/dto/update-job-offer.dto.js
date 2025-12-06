"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobOfferDto = void 0;
const create_job_offer_dto_1 = require("./create-job-offer.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateJobOfferDto extends (0, mapped_types_1.PartialType)(create_job_offer_dto_1.CreateJobOfferDto) {
}
exports.UpdateJobOfferDto = UpdateJobOfferDto;
//# sourceMappingURL=update-job-offer.dto.js.map