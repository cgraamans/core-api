import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {databaseModel} from './models';
import { serverConfig } from './config/server.config';
import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';

const app = express();

var corsOptions = {
  origin: "http://localhost:"+serverConfig.port
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/"+serverConfig.apiVersion+'/auth/',authRoute);
app.use("/"+serverConfig.apiVersion+'/user/',userRoute);

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to core." });
});

// set port, listen for requests
app.listen(serverConfig.port, () => {
  console.log(`Server is running on port ${serverConfig.port}.`);
});

databaseModel.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  databaseModel.role.create({
    id: 1,
    name: "user"
  });

  databaseModel.role.create({
    id: 2,
    name: "moderator"
  });

  databaseModel.role.create({
    id: 3,
    name: "admin"
  });

}