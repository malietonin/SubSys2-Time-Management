import { HttpStatus } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CandidateLoginDto } from './dto/candidate-login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: {
            userid: import("mongoose").Types.ObjectId;
            roles: string[];
            status: string;
        };
    }>;
    candidateLogin(candidateLoginDto: CandidateLoginDto, res: Response): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: {
            userid: import("mongoose").Types.ObjectId;
            userType: string;
            status: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<string>;
    registerFirstAdmin(registerDto: RegisterDto): Promise<string>;
    getMe(req: Request): Promise<{
        userid: any;
        userType: string;
        candidateNumber: any;
        email: any;
        status: any;
        employeeNumber?: undefined;
        roles?: undefined;
    } | {
        userid: any;
        employeeNumber: any;
        email: any;
        roles: any;
        status: any;
        userType?: undefined;
        candidateNumber?: undefined;
    }>;
    logout(res: Response): {
        statusCode: HttpStatus;
        message: string;
    };
}
