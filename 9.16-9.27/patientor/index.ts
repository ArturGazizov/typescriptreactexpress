var express =require('express');

let cors = require('cors')






let patientRouter = require('./routes/patients');
let diagnoseRouter = require('./routes/diagnoses');

let bodyParser = require('body-parser');


let app = express();


app.use(bodyParser.json());
app.use(cors());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use(express.json());

app.use(express.json());


const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/api/ping', (_req:any,res:any) => {
  console.log('someone pinged here');
  res.send('pong');
});










app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});