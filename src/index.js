const express = require('express');
const cors = require('cors');
const http = require('http');
const itemUpdater = require('./services/nike-item-update.service');
const { initDB } = require('./database');
const apiItemRouter = require('./controllers/api-items.controller');
const middlewares = require("./middlewares/middlewares");
const apiImageRouter = require('./controllers/api-image.contoller');
const apiAuthRouter = require('./controllers/api-auth.controller');
const apiUserRouter = require('./controllers/api-users.controller');

const app = express();

initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);
  
    next();
  });

  app.use("/api/items", apiItemRouter);
  app.use("/api/images", apiImageRouter);
  app.use("/api/auth", apiAuthRouter);
  app.use("/api/users", apiUserRouter);

  app.get('/', (req, res) => {
      res.status(200).json({message: itemUpdater.parseItems()});
  })

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  http.createServer(app).listen(80, () => {
    console.log('Server is working on port 80');
  })
  