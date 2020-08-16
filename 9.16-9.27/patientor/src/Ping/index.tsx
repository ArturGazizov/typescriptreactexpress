import React from "react";
import axios from "axios";



//const atype=typeof React.createContext([{},() => {}])

interface TotalProps {
  MyContext2: any
}






const Ping: React.FC<TotalProps> = (props) => {

console.log("props")
console.log("props")

console.log("props")
console.log("props")
console.log("props")
console.log("props")

	console.log(props)
	console.log(typeof props.MyContext2)


const MyContext3=React.createContext(props.MyContext2)


const theme = React.useContext(MyContext3);
console.log("theme")
console.log(theme)


const [state4,dispatch4 ]  = React.useContext(props.MyContext2);

console.log(state4)
console.log(dispatch4)


  const [response, setResponse] = React.useState<object>({});

React.useEffect(() => {

axios.get("http://localhost:3001/ping").then((it)=>{setResponse(it.data)});//whole response id always different regardless of data
    
  },[response]);


  
  return (
    <div>
    {/*
    <MyContext3.Consumer>
    {value => <div>{JSON.stringify(value)}</div>}
  </MyContext3.Consumer>*/
}
      {JSON.stringify(response)}
    </div>
  );



};

export default Ping;
