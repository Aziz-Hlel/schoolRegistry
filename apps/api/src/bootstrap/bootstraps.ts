import testFirebaseConnection from './test-connection/firebase.test.connection';
import { testDbConnection } from './test-connection/db.test.connection';
import { connectRedis } from './redis.init';
import seed from '@/seeds';
import { seedHighSchools } from '@/seeds/fakes/school.fake';
import { seedRegions } from '@/seeds/fakes/regions.fake';
import { seedElectives } from '@/seeds/fakes/electives.fake';
import { seedMajors } from '@/seeds/fakes/majors.fake';

const asyncBootstrapHandlers = async () => {
  await Promise.all([
    testFirebaseConnection(),
    testDbConnection(),
    connectRedis(),
    seedRegions(),
    seedMajors(),
    seedElectives(),
  ]);
  await seed();
};

export default asyncBootstrapHandlers;
