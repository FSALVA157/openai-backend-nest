import OpenAI from 'openai';

interface IOptions {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  options: IOptions,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
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

  return completion.choices[0].message.content;
};
