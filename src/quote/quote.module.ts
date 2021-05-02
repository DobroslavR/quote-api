import { QuoteController } from './quote.controller';
import { HttpModule, Module } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Module({
  imports: [HttpModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
