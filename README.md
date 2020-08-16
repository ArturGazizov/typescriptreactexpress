# typescriptreactexpress


npm install everywhere

    
9.1-9.7 typed input values ,calculating functions called by scripts, arguments to use,
also express server with inputting to get calculation from same scripts

npm run calculateBmi 180 91
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4


npm start
or
npm run dev

http://localhost:3002/bmi?height=180&weight=72
GET gives response
{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}

http://localhost:3002/exercises
POST with
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
gives

    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}
or
{
  error: "parameters missing"
}

npm run lint
for checking

9.14-9.15 react with typescript

9.16-9.27 
show and add patients, show and add to them 3 different kinds of entries

react context holds state in it, made of useReducer react hook, Formik, semantic-ui-react components, react routes, routes, services, express endpoints ,typescript

in 2 console:
npm start
npm run dev

and in tsconfig.json set:
    "module": "commonjs",
    "isolatedModules": false
