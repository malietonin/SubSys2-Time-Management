export declare class CreateCalendarDto {
    year: number;
    holidays?: string[];
    blockedPeriods?: {
        from: Date;
        to: Date;
        reason: string;
    }[];
}
