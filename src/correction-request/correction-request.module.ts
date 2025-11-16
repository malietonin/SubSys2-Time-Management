import { Module } from '@nestjs/common';
import { CorrectionRequestService } from './correction-request.service';
import { CorrectionRequestController } from './correction-request.controller';

@Module({
  controllers: [CorrectionRequestController],
  providers: [CorrectionRequestService],
})
export class CorrectionRequestModule {}
