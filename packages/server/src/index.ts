import cors from 'cors';
import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';
import { config } from './config';
import { PlayerRouter } from './routers/player_router';

const app = express();
const port = config.get('server.port');

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

app.use(cors());
app.use(json());
app.use("/test", PlayerRouter)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

export { knexClient };
