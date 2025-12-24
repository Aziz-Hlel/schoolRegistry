import testFirebaseConnection from './test-connection/firebase.test.connection';
import { testDbConnection } from './test-connection/db.test.connection';
import { connectRedis } from './redis.init';
import seed from '@/seeds';
import { seedHighSchools, seedRegions } from '@/seeds/fakes/school.fake';

const asyncBootstrapHandlers = async () => {
  await Promise.all([testFirebaseConnection(), testDbConnection(), connectRedis(), seedRegions, seedHighSchools]);
  await seed();
};

export default asyncBootstrapHandlers;
