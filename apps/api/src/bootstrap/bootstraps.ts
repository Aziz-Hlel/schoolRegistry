import testFirebaseConnection from './test-connection/firebase.test.connection';
import { testDbConnection } from './test-connection/db.test.connection';
import { connectRedis } from './redis.init';
import seed from '@/seeds';
import { seedHighSchools } from '@/seeds/fakes/school.fake';

const asyncBootstrapHandlers = async () => {
  await Promise.all([testFirebaseConnection(), testDbConnection(), connectRedis(), seedHighSchools]);
  await seed();
};

export default asyncBootstrapHandlers;
