import { createConnection, EntitySchema } from 'typeorm'
import logger from 'loglevel'

export const connectDb = async (retries = 5) => {
  while (retries) {
    try {
      await createConnection({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'autodesk_exam',
        synchronize: true,
        logging: true,
        entities: [
          new EntitySchema(require('../entity/account.json')),
        ]
      });
      logger.info(`Successfully Connected to Database`)
      break;
    } catch(err) {
      logger.error(err.message)
      retries-=1
      logger.log(`Retries remaining: ${retries}`)
      // wait for 3 seconds before attempting
      await new Promise(res => setTimeout(res, 3000))
    }
  }
};
