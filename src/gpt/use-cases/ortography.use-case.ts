import OpenAI from 'openai';

interface IProps {
  prompt: string;
}

export const ortographyCheckUseCase = async (openai: OpenAI, props: IProps) => {
  const { prompt } = props;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    temperature: 0.3,
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: `Eres un experto en ortografía, vas a corregir las frases que recibas de manera estricta, marcando los errores ortográficos y respondiendo con una salida en formato JSON, en el campo UserScore pondrás el numero de palabras erroneas de la frase, debes dar un porcentaje de aciertos por parte del usuario el cual se incluirá en el campo message, si no hay errores, debes retornar un mensaje de felicitaciones, usando emojis.
          Ejemplo de Salida:
          {
            userScore: number,
            errors: ['telefonica  -> telefónica'],
            message: string
          }
          `,
      },
      { role: 'user', content: prompt },
    ],
  });

  //const jsonRespons = JSON.parse(completion.choices[0].message.content);

  return JSON.parse(completion.choices[0].message.content);
};
