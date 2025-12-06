import { LeavesService } from './leaves.service';
import { CreateLeaveCategoryDto } from './dto/create-leave-category.dto';
import { UpdateLeaveCategoryDto } from './dto/update-leave-category.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { CreateLeavePolicyDto } from './dto/create-leave-policy.dto';
import { UpdateLeavePolicyDto } from './dto/update-leave-policy.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarHolidayDto } from './dto/update-calendar-holiday.dto';
import { UpdateCalendarBlockedDto } from './dto/update-calendar-blocked.dto';
import { CreateApprovalWorkflowDto } from './dto/create-approval-workflow.dto';
import { UpdateApprovalWorkflowDto } from './dto/update-approval-workflow.dto';
import { CreatePaycodeMappingDto } from './dto/create-paycode-mapping.dto';
import { UpdatePaycodeMappingDto } from './dto/update-paycode-mapping.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
export declare class LeavesController {
    private readonly service;
    constructor(service: LeavesService);
    createCategory(dto: CreateLeaveCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./models/leave-category.schema").LeaveCategory, {}, {}> & import("./models/leave-category.schema").LeaveCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, import("./models/leave-category.schema").LeaveCategory, {}, {}> & import("./models/leave-category.schema").LeaveCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateCategory(id: string, dto: UpdateLeaveCategoryDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/leave-category.schema").LeaveCategory, {}, {}> & import("./models/leave-category.schema").LeaveCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/leave-category.schema").LeaveCategory, {}, {}> & import("./models/leave-category.schema").LeaveCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/leave-category.schema").LeaveCategory, "findOneAndUpdate", {}>;
    deleteCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/leave-category.schema").LeaveCategory, {}, {}> & import("./models/leave-category.schema").LeaveCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createLeaveType(dto: CreateLeaveTypeDto): Promise<import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllLeaveTypes(): Promise<(import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateLeaveType(id: string, dto: UpdateLeaveTypeDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/leave-type.schema").LeaveType, "findOneAndUpdate", {}>;
    deleteLeaveType(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/leave-type.schema").LeaveType, {}, {}> & import("./models/leave-type.schema").LeaveType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createPolicy(dto: CreateLeavePolicyDto): Promise<import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllPolicies(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/leave-policy.schema").LeavePolicy, "find", {}>;
    updatePolicy(id: string, dto: UpdateLeavePolicyDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/leave-policy.schema").LeavePolicy, "findOneAndUpdate", {}>;
    deletePolicy(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/leave-policy.schema").LeavePolicy, {}, {}> & import("./models/leave-policy.schema").LeavePolicy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createCalendar(dto: CreateCalendarDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/calendar.schema").Calendar, "findOneAndUpdate", {}>;
    getCalendar(year: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/calendar.schema").Calendar, "findOne", {}>;
    addHoliday(year: number, dto: UpdateCalendarHolidayDto): Promise<import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeHoliday(year: number, dto: UpdateCalendarHolidayDto): Promise<import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addBlocked(year: number, dto: UpdateCalendarBlockedDto): Promise<import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeBlocked(year: number, index: number): Promise<import("mongoose").Document<unknown, {}, import("./models/calendar.schema").Calendar, {}, {}> & import("./models/calendar.schema").Calendar & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createMapping(dto: CreatePaycodeMappingDto): Promise<any>;
    getAllMappings(): import("mongoose").Query<any[], any, {}, any, "find", {}>;
    updateMapping(id: string, dto: UpdatePaycodeMappingDto): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    deleteMapping(id: string): import("mongoose").Query<any, any, {}, any, "findOneAndDelete", {}>;
    createWorkflow(dto: CreateApprovalWorkflowDto): Promise<import("mongoose").Document<unknown, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, {}, {}> & import("./models/approval-workflow.schema").ApprovalWorkflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getWorkflow(leaveTypeId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, {}, {}> & import("./models/approval-workflow.schema").ApprovalWorkflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, {}, {}> & import("./models/approval-workflow.schema").ApprovalWorkflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, "findOne", {}>;
    updateWorkflow(leaveTypeId: string, dto: UpdateApprovalWorkflowDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, {}, {}> & import("./models/approval-workflow.schema").ApprovalWorkflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, {}, {}> & import("./models/approval-workflow.schema").ApprovalWorkflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./models/approval-workflow.schema").ApprovalWorkflow, "findOneAndUpdate", {}>;
    createLeaveRequest(dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllLeaveRequests(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    getLeaveRequest(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "findOne", {}>;
    updateLeaveRequest(id: string, dto: UpdateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/leave-request.schema").LeaveRequest, {}, {}> & import("./models/leave-request.schema").LeaveRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
