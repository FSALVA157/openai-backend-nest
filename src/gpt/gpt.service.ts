import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { OrthographyDto, ProsConsDiscusserDto } from './dto';
import {
  ortographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsStreamUseCase,
} from './use-cases';

@Injectable()
export class GptService {
  constructor(private configService: ConfigService) {}

  private openai = new OpenAI({
    apiKey: this.configService.get('OPENAI_API_KEY'),
  });

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await ortographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsStreamUseCase(this.openai, { prompt });
  }
}
