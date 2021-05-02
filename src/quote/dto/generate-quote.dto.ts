import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { Quote } from '../quote.interface';
import { QUOTE_LENGTH_LIMIT } from '../quote.service';

export class GenerateQuoteDto implements Quote {
  @ApiProperty({ default: 'It’s a-me, Mario!' })
  @IsString()
  @IsNotEmpty()
  @Length(1, QUOTE_LENGTH_LIMIT)
  text: string;

  @ApiProperty({ default: 'Ezio’s uncle Mario' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  author: string;
}
