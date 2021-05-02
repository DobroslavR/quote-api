import { QuoteModule } from './quote/quote.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [QuoteModule],
})
export class AppModule {}
