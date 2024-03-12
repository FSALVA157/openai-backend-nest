import OpenAI from 'openai';

interface IOptions {
  prompt: string;
}

export const prosConsStreamUseCase = async (
  openai: OpenAI,
  options: IOptions,
) => {
  const { prompt } = options;

  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: 0.3,
    messages: [
      {
        role: 'system',
        content:
          'Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras, la respuesta debe de ser en formato markdown, los pros y contras deben de estar en una lista,',
      },
      { role: 'user', content: prompt },
    ],
  });
};
