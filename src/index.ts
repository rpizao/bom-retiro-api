import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import { AuthRepository } from "./repositories/auth.repository";
import { IndicatorRepository } from "./repositories/indicator.repository";
import { ProjectRepository } from "./repositories/project.repository";
import { CryptoSaltUtils } from "./utils/crypto-salt-utils";


dotenv.config({ path: ".env" });

let port: number = 8000;
if(process.env.PORT) port = parseInt(process.env.PORT, 10);

let app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.route('/api/login').post((req, res) => {
  var repo = new AuthRepository();
  repo.login(req.body).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/logout').get((req, res) => {
  var repo = new AuthRepository();
  repo.logout(req.body).then(() => {
    res.status(200).send();
  }).catch(r => console.log(r));
})

app.route('/api/indicators').get((req, res) => {
  var repo = new IndicatorRepository();
  repo.list().then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/indicators/:code').get((req, res) => {
  var repo = new IndicatorRepository();
  repo.get(req.params.code).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects').get((req, res) => {
  var repo = new ProjectRepository();
  repo.list().then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects').post((req, res) => {
  var repo = new ProjectRepository();
  repo.save(req.body).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects/:code').get((req, res) => {
  var repo = new ProjectRepository();
  repo.get(req.params.code).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects/:code/comment').put((req, res) => {
  var repo = new ProjectRepository();
  repo.addComment(req.params.code, req.body).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects/:code/state').put((req, res) => {
  var repo = new ProjectRepository();
  repo.updateStatus(req.params.code).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})

app.route('/api/projects/:code/cancel').put((req, res) => {
  var repo = new ProjectRepository();
  repo.updateStatus(req.params.code).then((result) => {
    const code = result ? 200 : 403;
    res.status(code).send(result);
  }).catch(r => console.log(r));
})



/**
 * Server Activation
 */
let server: Server = app.listen(port, () => console.log(`Servidor iniciando em ${port}.`));

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    server.close();
  });
}