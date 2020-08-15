export interface calculatedValues {
  periodLength: number;
  trainingdays: number;
  target:number;
  average:number;
  success:boolean;
  rating:number;
  ratingDescription:string;
}



export const calculate = (args: Array<number>): calculatedValues => {


const average=args.slice(0, 7).reduce(function(a, b){return ((a + b)/2);});


let ratingDescription="";

let rating=(average/args[7]);


if (rating <1)
	{rating=rating+1;
    ratingDescription="too little";}

else if (rating >1)
	{rating=(rating+2)>3?3:(rating+2);
	ratingDescription="too much";}

else if (rating ==1)
	{rating=2;
    ratingDescription="ideal";}



     return {
      periodLength: 7,
      trainingdays: (args.slice(0, 7).filter(function(obj) { return obj>0 ;})).length,
      target: (args[7]),
      average: average,
      success: average>=args[7],
      rating: rating,
      ratingDescription: ratingDescription
    };



  };