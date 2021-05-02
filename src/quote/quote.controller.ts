import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenerateQuoteDto } from './dto/generate-quote.dto';
import { QuoteService } from './quote.service';

@Controller('')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Post('/generate')
  @UsePipes(ValidationPipe)
  generateSingleQuote(@Body() generateSingleQuoteDto: GenerateQuoteDto) {
    return this.quoteService.generateQuote(generateSingleQuoteDto);
  }
}
