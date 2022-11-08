const express = require("express");
const { testReq } = require("./database");
// const { warehouseService } = require("./requests");
const router = require("./routers/appRouter");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const port = 3000;

// app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(require('connect').bodyParser());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
