import express =require('express');


import {calculator} from './bmi';
import {calculate} from './exercise';

import bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

interface inputValues {
  daily_exercises: Array<number>;
  target: number;
}



app.get('/', (_req:express.Request,res:express.Response) => {//underscore unused
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req:express.Request,res:express.Response) => {
const height = Number(req.query.height);
const weight = Number(req.query.weight);
const result=calculator(weight,height);
res.send({
	weight:weight,
	height:height,
	bmi:result});


});



//or use comment // eslint-disable-next-line @typescript-eslint/no-explicit-any
//just above place, where 'any' type is used
app.post('/exerc', (req:express.Request,res:express.Response) => {
try{


const body = req.body as inputValues;//
//const body:inputValues = req.body;

if((!('target' in Object.keys(body)))||(!('daily_exercises' in Object.keys(body))))
throw new Error('parameters missing');

if ((typeof body.target!="number")|| 
	(typeof body.daily_exercises!="object")|| 
	(body.daily_exercises.length!=7)||
	!(body.daily_exercises.reduce(function(result, val) {
   return result && typeof val === 'number';
}, true)))
throw new Error('malformatted parameters');

	const result=calculate([...body.daily_exercises,body.target]);
	res.send(result);
}
catch(e)
{
	if (e instanceof Error)
res.send({error:e.message});
}

});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});