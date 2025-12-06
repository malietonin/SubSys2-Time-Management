import { Model, Types } from 'mongoose';
import { LeaveCategory } from './models/leave-category.schema';
import { LeaveType } from './models/leave-type.schema';
import { LeavePolicy } from './models/leave-policy.schema';
import { Calendar } from './models/calendar.schema';
import { ApprovalWorkflow } from './models/approval-workflow.schema';
import { LeaveEntitlement } from './models/leave-entitlement.schema';
import { LeaveRequest, LeaveRequestDocument } from './models/leave-request.schema';
import { EmployeeProfileDocument } from '../employee-profile/models/employee-profile.schema';
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
type Employee = {
    _id: string;
    grade: string;
    tenure: number;
    contractType: string;
    status?: string;
};
export declare class LeavesService {
    private readonly categoryModel;
    private readonly typeModel;
    private readonly policyModel;
    private readonly calendarModel;
    private readonly workflowModel;
    private readonly entitlementModel;
    private readonly paycodeModel;
    private readonly requestModel;
    private readonly employeeModel;
    constructor(categoryModel: Model<LeaveCategory>, typeModel: Model<LeaveType>, policyModel: Model<LeavePolicy>, calendarModel: Model<Calendar>, workflowModel: Model<ApprovalWorkflow>, entitlementModel: Model<LeaveEntitlement>, paycodeModel: Model<any>, requestModel: Model<LeaveRequestDocument>, employeeModel: Model<EmployeeProfileDocument>);
    createCategory(dto: CreateLeaveCategoryDto): Promise<import("mongoose").Document<unknown, {}, LeaveCategory, {}, {}> & LeaveCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, LeaveCategory, {}, {}> & LeaveCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateCategory(id: string, dto: UpdateLeaveCategoryDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, LeaveCategory, {}, {}> & LeaveCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, LeaveCategory, {}, {}> & LeaveCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, LeaveCategory, "findOneAndUpdate", {}>;
    deleteCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, LeaveCategory, {}, {}> & LeaveCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createLeaveType(dto: CreateLeaveTypeDto): Promise<import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllLeaveTypes(): Promise<(import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updateLeaveType(id: string, dto: UpdateLeaveTypeDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, LeaveType, "findOneAndUpdate", {}>;
    deleteLeaveType(id: string): Promise<(import("mongoose").Document<unknown, {}, LeaveType, {}, {}> & LeaveType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createPolicy(dto: CreateLeavePolicyDto): Promise<import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllPolicies(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, LeavePolicy, "find", {}>;
    updatePolicy(id: string, dto: UpdateLeavePolicyDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, LeavePolicy, "findOneAndUpdate", {}>;
    deletePolicy(id: string): Promise<(import("mongoose").Document<unknown, {}, LeavePolicy, {}, {}> & LeavePolicy & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createCalendar(dto: CreateCalendarDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, Calendar, "findOneAndUpdate", {}>;
    getCalendarByYear(year: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, Calendar, "findOne", {}>;
    addHoliday(year: number, dto: UpdateCalendarHolidayDto): Promise<import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeHoliday(year: number, dto: UpdateCalendarHolidayDto): Promise<import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    addBlockedPeriod(year: number, dto: UpdateCalendarBlockedDto): Promise<import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeBlockedPeriod(year: number, index: number): Promise<import("mongoose").Document<unknown, {}, Calendar, {}, {}> & Calendar & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    calculateNetLeaveDays(start: Date, end: Date, year: number): Promise<number>;
    createEntitlementForEmployee(employee: Employee): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, LeaveEntitlement, {}, {}> & LeaveEntitlement & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, Omit<{
        employeeId: Types.ObjectId;
        leaveTypeId: Types.ObjectId;
        yearlyEntitlement: number;
        accruedActual: number;
        accruedRounded: number;
        carryForward: number;
        taken: number;
        pending: number;
        remaining: number;
        lastAccrualDate: null;
        nextResetDate: null;
    }, "_id">>[]>;
    accrueMonthlyEntitlements(): Promise<{
        message: string;
    }>;
    resetYearlyBalances(): Promise<{
        message: string;
    }>;
    createApprovalWorkflow(dto: CreateApprovalWorkflowDto): Promise<import("mongoose").Document<unknown, {}, ApprovalWorkflow, {}, {}> & ApprovalWorkflow & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getApprovalWorkflow(leaveTypeId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, ApprovalWorkflow, {}, {}> & ApprovalWorkflow & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, ApprovalWorkflow, {}, {}> & ApprovalWorkflow & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, ApprovalWorkflow, "findOne", {}>;
    updateApprovalWorkflow(leaveTypeId: string, dto: UpdateApprovalWorkflowDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, ApprovalWorkflow, {}, {}> & ApprovalWorkflow & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, ApprovalWorkflow, {}, {}> & ApprovalWorkflow & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, ApprovalWorkflow, "findOneAndUpdate", {}>;
    createPaycodeMapping(dto: CreatePaycodeMappingDto): Promise<any>;
    getAllPaycodeMappings(): import("mongoose").Query<any[], any, {}, any, "find", {}>;
    getPaycodeForLeaveType(leaveTypeId: string): import("mongoose").Query<any, any, {}, any, "findOne", {}>;
    updatePaycodeMapping(id: string, dto: UpdatePaycodeMappingDto): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    deletePaycodeMapping(id: string): import("mongoose").Query<any, any, {}, any, "findOneAndDelete", {}>;
    createLeaveRequest(employeeId: string, dto: CreateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAllLeaveRequests(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    getLeaveRequest(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "findOne", {}>;
    updateLeaveRequest(id: string, dto: UpdateLeaveRequestDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    routeToManager(leaveRequestId: string, delegateToId?: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    managerDecision(leaveRequestId: string, managerId: string, decision: 'approved' | 'rejected'): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    hrComplianceReview(leaveRequestId: string, hrId: string, action: 'approved' | 'rejected', overrideManager?: boolean): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    finalizeLeaveRequest(leaveRequestId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, LeaveRequest, {}, {}> & LeaveRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    autoEscalateManagerApprovals(): Promise<number>;
}
export {};
