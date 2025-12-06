import { NotificationLogService } from './services/notification-log.service';
import { ShiftAssignmentService } from './services/shift-assignment.service';
import { ScheduleRuleService } from './services/schedule-rule.service';
import { AttendanceCorrectionRequestService } from './services/attendance-correction-request.service';
import { ShiftAssignmentCreateDto } from './dtos/shift-assignment-create-dto';
import { NotificationLogCreateDto } from './dtos/notification-log-create-dto';
import { ScheduleRuleCreateDto } from './dtos/schedule-rule-create-dto';
import { ScheduleRuleUpdateDto } from './dtos/schedule-rule-update-dto';
import { AttendanceCorrectionRequestDto, UpdateAttendanceCorrectionRequestDto } from './dtos/create-attendance-correction-request-dto';
import { CreateHolidayDto } from './dtos/holiday-create-dto';
import { HolidayService } from './services/holiday.service';
import { Types } from 'mongoose';
import { ShiftAssignmentUpdateDto } from './dtos/shift-assignment-update-dto';
import { ShiftTypeCreateDto } from './dtos/shift-type-create-dto';
import { ShiftTypeService } from './services/shift-type.service';
import { ShiftAssignmentStatus } from './models/enums';
import { ShiftCreateDto } from './dtos/shift-create-dto';
import { ShiftService } from './services/shift.service';
import { TimeExceptionService } from './services/time-exception.service';
import { OvertimeRuleService } from './services/overtime-rule.service';
import { LatenessRuleService } from './services/lateness-rule.service';
import { OvertimeRuleCreateDto } from './dtos/overtime-rule-create.dto';
import { OvertimeRuleUpdateDto } from './dtos/overtime-rule-update.dto';
import { LatenessRuleCreateDto } from './dtos/lateness-rule-create.dto';
import { LatenessRuleUpdateDto } from './dtos/lateness-rule-update.dto';
import { AttendanceRecordService } from './services/attendance-record.service';
import { CreateAttendancePunchDto } from './dtos/create-attendance-record-dto';
import { CreateAttendanceRecordDto } from './dtos/attendance-record-dto';
import { UpdateAttendanceRecordDto } from './dtos/update-attendance-record-dto';
export declare class TimeManagementController {
    private readonly shiftAssignmentService;
    private readonly notificationLogService;
    private readonly scheduleRuleService;
    private readonly attendanceCorrectionRequestService;
    private readonly holidayService;
    private shiftTypeService;
    private shiftService;
    private timeExceptionService;
    private overtimeRuleService;
    private latenessRuleService;
    private attendanceRecordService;
    constructor(shiftAssignmentService: ShiftAssignmentService, notificationLogService: NotificationLogService, scheduleRuleService: ScheduleRuleService, attendanceCorrectionRequestService: AttendanceCorrectionRequestService, holidayService: HolidayService, shiftTypeService: ShiftTypeService, shiftService: ShiftService, timeExceptionService: TimeExceptionService, overtimeRuleService: OvertimeRuleService, latenessRuleService: LatenessRuleService, attendanceRecordService: AttendanceRecordService);
    assignShift(assignData: ShiftAssignmentCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllShiftAssignments(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    detectUpcomingExpiry(): Promise<{
        success: boolean;
        message: string;
        data: void[];
    }>;
    getShiftAssignmentById(shiftAssignmentId: string): Promise<{
        sucess: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateShiftAssignment(shiftAssignmentId: string, status: ShiftAssignmentStatus): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    extendShiftAssignment(shiftAssignmentId: string, dto: ShiftAssignmentUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-assignment.schema").ShiftAssignment, {}, {}> & import("./models/shift-assignment.schema").ShiftAssignment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    sendNotification(notifData: NotificationLogCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllNotifications(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getNotificationbyId(notifId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getEmployeeNotifications(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/notification-log.schema").NotificationLog, {}, {}> & import("./models/notification-log.schema").NotificationLog & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    createScheduleRule(dto: ScheduleRuleCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllScheduleRules(): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getScheduleRuleById(id: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateScheduleRule(id: string, dto: ScheduleRuleUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteScheduleRule(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/schedule-rule.schema").ScheduleRule, {}, {}> & import("./models/schedule-rule.schema").ScheduleRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    recordClockIn(dto: CreateAttendancePunchDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    recordClockOut(dto: CreateAttendancePunchDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    detectMissedPunches(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    listAttendanceForEmployee(employeeId: string, startDate?: string, endDate?: string): Promise<{
        success: boolean;
        message: string;
        data: import("./models/attendance-record.schema").Punch[];
    }>;
    updatePunchByTime(employeeId: string, punchTime: string, update: {
        time?: string;
        type?: 'IN' | 'OUT';
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deletePunchByTime(employeeId: string, punchTime: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deletePunchesForDate(employeeId: string, date: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    createAttendanceRecord(dto: CreateAttendanceRecordDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateAttendanceRecord(id: string, dto: UpdateAttendanceRecordDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-record.schema").AttendanceRecord, {}, {}> & import("./models/attendance-record.schema").AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    flagRepeatedLateness(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            repeated: {
                success: boolean;
                message: string;
                repeatedLateness: number;
                isRepeated?: undefined;
                action?: undefined;
            } | {
                success: boolean;
                repeatedLateness: number;
                isRepeated: boolean;
                action: string;
                message?: undefined;
            };
        };
    }>;
    submitCorrectionRequest(dto: AttendanceCorrectionRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>;
        };
    }>;
    updateCorrectionRequest(id: string, dto: UpdateAttendanceCorrectionRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>;
        };
    }>;
    approveCorrectionRequest(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>;
        };
    }>;
    rejectCorrectionRequest(id: string, reason: string): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>;
        };
    }>;
    listEmployeeRequests(employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest, {}, {}> & import("./models/attendance-correction-request.schema").AttendanceCorrectionRequest & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    autoEscalate(): Promise<{
        success: boolean;
        message: string;
        data: {
            escalatedCount: number;
        };
    }>;
    createHoliday(dto: CreateHolidayDto): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>;
        };
    }>;
    getAllHolidays(): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/holiday.schema").Holiday, {}, {}> & import("./models/holiday.schema").Holiday & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            } & Required<{
                _id: Types.ObjectId;
            }>)[];
        };
    }>;
    createShiftType(shiftTypeData: ShiftTypeCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllShiftTypes(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getShiftTypeById(shiftTypeId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteShiftType(shiftTypeId: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift-type.schema").ShiftType, {}, {}> & import("./models/shift-type.schema").ShiftType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>) | null;
    }>;
    createShift(shiftData: ShiftCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllShifts(): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getShiftById(shiftId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deactivateShift(shiftId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    activateShift(shiftId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteShift(shiftId: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/shift.schema").Shift, {}, {}> & import("./models/shift.schema").Shift & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    approveTimeException(id: string, approvedBy: string): Promise<{
        success: boolean;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    rejectTimeException(id: string, rejectedBy: string, reason: string): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./models/time-exception.schema").TimeException, {}, {}> & import("./models/time-exception.schema").TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    autoEscalateTimeExceptions(): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
    createOvertimeRule(dto: OvertimeRuleCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateOvertimeRule(id: string, dto: OvertimeRuleUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/overtime-rule.schema").OvertimeRule, {}, {}> & import("./models/overtime-rule.schema").OvertimeRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteOvertimeRule(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    createLatenessRule(dto: LatenessRuleCreateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllLatenessRules(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    getLatenessRuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    updateLatenessRule(id: string, dto: LatenessRuleUpdateDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./models/lateness-rule.schema").LatenessRule, {}, {}> & import("./models/lateness-rule.schema").LatenessRule & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteLatenessRule(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
