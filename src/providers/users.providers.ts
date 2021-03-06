import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/users.schema'
import { TopicSchema } from '../schemas/topics.schema'
export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide:'TOPIC_MODEL',
    useFactory: (connection: Connection) => connection.model('Topic', TopicSchema),
    inject: ['DATABASE_CONNECTION'],
  }
];