import cors from 'cors';
import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';
import { config } from './config';
import { tournamentsRouter } from './routers/tournament_router';

const app = express();
const port = config.get('server.port');

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

app.use(cors());
app.use(json());

app.get("/", (req, res) => { res.send(200) })
app.use('/tournaments', tournamentsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

export { knexClient };
