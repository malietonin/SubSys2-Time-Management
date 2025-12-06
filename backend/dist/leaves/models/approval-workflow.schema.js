"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalWorkflowSchema = exports.ApprovalWorkflow = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApprovalWorkflow = class ApprovalWorkflow {
    leaveTypeId;
    flow;
};
exports.ApprovalWorkflow = ApprovalWorkflow;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'LeaveType', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ApprovalWorkflow.prototype, "leaveTypeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                role: { type: String, required: true },
                order: { type: Number, required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], ApprovalWorkflow.prototype, "flow", void 0);
exports.ApprovalWorkflow = ApprovalWorkflow = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ApprovalWorkflow);
exports.ApprovalWorkflowSchema = mongoose_1.SchemaFactory.createForClass(ApprovalWorkflow);
//# sourceMappingURL=approval-workflow.schema.js.map