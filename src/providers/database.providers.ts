import * as mongoose from 'mongoose';
import { account, mongodbUrl, pwd, authSource } from '../../config'
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(mongodbUrl,{ useNewUrlParser: true,user:account,pass:pwd,authSource:authSource,useUnifiedTopology:true}),
  },
];