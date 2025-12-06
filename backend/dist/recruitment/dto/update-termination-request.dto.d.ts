import { CreateTerminationRequestDto } from './create-termination-request.dto';
declare const UpdateTerminationRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateTerminationRequestDto, "employeeId" | "contractId">>>;
export declare class UpdateTerminationRequestDto extends UpdateTerminationRequestDto_base {
}
export {};
