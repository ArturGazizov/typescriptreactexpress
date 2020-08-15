import {calculator} from './bmi';


interface readValues2 {
  value1: number;
  value2: number;
}


const parseArguments2 = (args: Array<string>): readValues2 => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};





try {
  const { value1, value2 }= parseArguments2(process.argv);
  console.log(calculator(value1, value2));
} catch (e) {
if (e instanceof Error)
  console.log('Error, something bad happened, message: ', e.message);
}

//console.log(calculator(180,74))

