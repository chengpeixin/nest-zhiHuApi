import { Connection } from 'mongoose';
import {UserSchema} from '../schemas/users.schema'

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];