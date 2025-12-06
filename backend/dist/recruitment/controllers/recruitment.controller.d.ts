import { RecruitmentService } from '../services/recruitment.service';
import { CreateJobOfferDto } from '../dto/create-job-offer.dto';
import { UpdateJobOfferDto } from '../dto/update-job-offer.dto';
import { CreateReferralDto } from '../dto/create-referral.dto';
import { CreateInterviewDto } from '../dto/create-interview.dto';
import { UpdateInterviewDto } from '../dto/update-interview.dto';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { CreateJobTemplateDto } from '../dto/create-job-template.dto';
import { UpdateJobTemplateDto } from '../dto/update-job-template.dtos';
import { CreateJobRequisitionDto } from '../dto/create-job-requisition.dto';
import { UpdateJobRequisitionDto } from '../dto/update-job-requisition.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    createJobTemplate(createJobTemplateDto: CreateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("../models/job-template.schema").JobTemplate, {}, {}> & import("../models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllJobTemplates(): Promise<(import("mongoose").Document<unknown, {}, import("../models/job-template.schema").JobTemplate, {}, {}> & import("../models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getJobTemplate(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/job-template.schema").JobTemplate, {}, {}> & import("../models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateJobTemplate(templateId: string, dto: UpdateJobTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("../models/job-template.schema").JobTemplate, {}, {}> & import("../models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteJobTemplate(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/job-template.schema").JobTemplate, {}, {}> & import("../models/job-template.schema").JobTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createJobRequisition(templateId: string, createJobRequisitionDto: CreateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("../models/job-requisition.schema").JobRequisition, {}, {}> & import("../models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllJobRequisitions(): Promise<(import("mongoose").Document<unknown, {}, import("../models/job-requisition.schema").JobRequisition, {}, {}> & import("../models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/job-requisition.schema").JobRequisition, {}, {}> & import("../models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateJobRequisition(id: string, dto: UpdateJobRequisitionDto): Promise<import("mongoose").Document<unknown, {}, import("../models/job-requisition.schema").JobRequisition, {}, {}> & import("../models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteJobRequisition(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/job-requisition.schema").JobRequisition, {}, {}> & import("../models/job-requisition.schema").JobRequisition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createOffer(createJobOfferDto: CreateJobOfferDto): Promise<import("mongoose").Document<unknown, {}, import("../models/offer.schema").Offer, {}, {}> & import("../models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllOffers(): Promise<(import("mongoose").Document<unknown, {}, import("../models/offer.schema").Offer, {}, {}> & import("../models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getOffer(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/offer.schema").Offer, {}, {}> & import("../models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateOffer(id: string, updateJobOfferDto: UpdateJobOfferDto): Promise<import("mongoose").Document<unknown, {}, import("../models/offer.schema").Offer, {}, {}> & import("../models/offer.schema").Offer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createReferral(createReferralDto: CreateReferralDto): Promise<import("mongoose").Document<unknown, {}, import("../models/referral.schema").Referral, {}, {}> & import("../models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getReferral(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/referral.schema").Referral, {}, {}> & import("../models/referral.schema").Referral & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createInterview(createInterviewDto: CreateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("../models/interview.schema").Interview, {}, {}> & import("../models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllInterviews(): Promise<(import("mongoose").Document<unknown, {}, import("../models/interview.schema").Interview, {}, {}> & import("../models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getInterviewsByPanelMember(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/interview.schema").Interview, {}, {}> & import("../models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getInterview(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/interview.schema").Interview, {}, {}> & import("../models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateInterview(id: string, updateInterviewDto: UpdateInterviewDto): Promise<import("mongoose").Document<unknown, {}, import("../models/interview.schema").Interview, {}, {}> & import("../models/interview.schema").Interview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<import("mongoose").Document<unknown, {}, import("../models/assessment-result.schema").AssessmentResult, {}, {}> & import("../models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllFeedback(): Promise<(import("mongoose").Document<unknown, {}, import("../models/assessment-result.schema").AssessmentResult, {}, {}> & import("../models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getFeedback(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/assessment-result.schema").AssessmentResult, {}, {}> & import("../models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto): Promise<import("mongoose").Document<unknown, {}, import("../models/assessment-result.schema").AssessmentResult, {}, {}> & import("../models/assessment-result.schema").AssessmentResult & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getApplicationHistory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/application-history.schema").ApplicationStatusHistory, {}, {}> & import("../models/application-history.schema").ApplicationStatusHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createApplication(createApplicationDto: CreateApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("../models/application.schema").Application, {}, {}> & import("../models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllApplications(): Promise<(import("mongoose").Document<unknown, {}, import("../models/application.schema").Application, {}, {}> & import("../models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getApplication(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/application.schema").Application, {}, {}> & import("../models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateApplication(id: string, updateApplicationDto: UpdateApplicationDto): Promise<import("mongoose").Document<unknown, {}, import("../models/application.schema").Application, {}, {}> & import("../models/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
