import { Connection } from 'mongoose';
import { AnswersSchema } from 'src/schemas/answers.chema';
export const answersProviders = [
  {
    provide:'ANSWER_MODEL',
    useFactory: (connection: Connection) => connection.model('Answers', AnswersSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];