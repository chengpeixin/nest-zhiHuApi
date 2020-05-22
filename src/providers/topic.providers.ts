import { Connection } from 'mongoose';
import { TopicSchema } from '../schemas/topics.schema'
export const topicProviders = [
  {
    provide:'TOPIC_MODEL',
    useFactory: (connection: Connection) => connection.model('Topic', TopicSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];