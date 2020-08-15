
export const calculator = (weight: number, height: number): string => {

const Bmi:number = weight/(height*height);






if (Bmi >30)
return ("Overweight (unhealthy weight)");
if (Bmi < 16)
return ("Underweight (unhealthy weight)");
return ("Normal (healthy weight)");

// `Multiplied ${weight} and ${height}, the result is:`
};