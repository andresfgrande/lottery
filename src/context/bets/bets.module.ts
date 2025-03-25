import { Delete, Module } from '@nestjs/common';
import { CreateBetService } from './services/createBet.service';
import { BetsRepository } from './infrastructure/betsRepository';
import { SharedModule } from '../shared/shared.module';
import { DateGenerator } from './infrastructure/dateGenerator';
import { GetBetService } from './services/getBet.service';
import { GetAllBetsInfoService } from './services/getAllBetsInfo.service';
import { DeleteBetService } from './services/deleteBet.service';

@Module({
  imports: [SharedModule],
  providers: [
    CreateBetService,
    BetsRepository,
    DateGenerator,
    GetBetService,
    GetAllBetsInfoService,
    DeleteBetService,
  ],
  exports: [CreateBetService, GetBetService, GetAllBetsInfoService, DeleteBetService],
})
export class BetsModule {}
