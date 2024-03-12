import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { GptService } from './gpt.service';

import { OrthographyDto } from './dto';
import { ProsConsDiscusserDto } from './dto/pros-cons-discusser.dto';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('ortography-check')
  ortographyCheck(
    @Body()
    orthographyDto: OrthographyDto,
  ) {
    return this.gptService.ortographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body()
    prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res()
    res: Response,
  ) {
    const stream = await this.gptService.prosConsDicusserStream(
      prosConsDiscusserDto,
    );

    res.setHeader('content-type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
