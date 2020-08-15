import {calculate} from './exercise';





interface readValues {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
}

const parseArguments = (args: Array<string>): readValues => {
  if (args.length < 10) throw new Error('Not enough arguments');
  if (args.length > 10) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))&& !isNaN(Number(args[4]))&& !isNaN(Number(args[5]))&& !isNaN(Number(args[6]))&& !isNaN(Number(args[7]))&& !isNaN(Number(args[8]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      value3: Number(args[4]),
      value4: Number(args[5]),
      value5: Number(args[6]),
      value6: Number(args[7]),
      value7: Number(args[8]),
      value8: Number(args[9]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};







try {
  const { value1, value2,value3,value4 ,value5,value6,value7,value8 }= parseArguments(process.argv);
  console.log(calculate([value1, value2,value3,value4 ,value5,value6,value7,value8]));
} catch (e) {
  if (e instanceof Error)
  console.log('Error, something bad happened, message: ', e.message);
}