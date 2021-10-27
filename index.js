const express = require('express');
const cors = require('cors');
const http = require('http');
const hello = require('./item_update').helloWorld;

const app = express();

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

  app.get('/', (req, res) => {
      res.status(200).json({message: hello()});
  })

  http.createServer(app).listen(80, () => {
    console.log('Server is working on port 80');
  })
  