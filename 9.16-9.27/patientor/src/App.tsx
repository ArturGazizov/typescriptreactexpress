import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue,fetchingpatients } from "./state";
import { PatientEntry } from "./types";

import PatientPage from "./PatientPage";

import PatientListPage from "./PatientListPage";
import Ping from "./Ping";

import {StateContext} from "./state";










type Action2 =
   {
      type: "ON";
      payload: boolean;
    }
  | {
      type: "OFF";
      payload: boolean;
}


type State2 = {
  isLoggedIn: boolean
};

const reducer2 = (state: State2, action: Action2): State2 => {
  switch (action.type) {
    case "ON":
      return {
        isLoggedIn:true
      };
    case "OFF":
      return {
        isLoggedIn:false
      };
    default:
      return state;
  }
};


const initialState: State2 = {
  isLoggedIn: false
};




export const MyContext = React.createContext<[State2, React.Dispatch<Action2>]>([
  initialState,
  () => initialState
]);









const App: React.FC = () => {
  const [, dispatch] = useStateValue();




const [state2, dispatch2] = React.useReducer(reducer2, {"isLoggedIn":false});

const MyContext2 = React.createContext<[State2, React.Dispatch<Action2>]>([
  state2,
  dispatch2
]);

  React.useEffect(() => {

    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<PatientEntry[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(fetchingpatients(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch,dispatch2]);


React.useEffect(() => {


},[state2,dispatch2])





const fetchPatient = async (id:string) => {
      try {
{
const { data: patientFromApi } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
        console.log(Object.keys(patientFromApi))


}

      } catch (e) {
        console.error(e);
      }
    };






  return (
    <div className="App">

State2: {state2.isLoggedIn}



State: {JSON.stringify(state2)}

<MyContext.Consumer>
{context3 => (
            <React.Fragment>
                {JSON.stringify(context3)}
            </React.Fragment>
        )}
</MyContext.Consumer>






    <Button onClick={()=>dispatch2({type:"ON",payload:true})}>
            ON
          </Button>
           <Button onClick={()=>dispatch2({type:"OFF",payload:true})}>
            OFF
          </Button>
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>



          <Button as={Link} to="/ping" primary>
            Ping
          </Button>
          
          <Divider hidden />
          <Switch>



    <Route exact path="/ping">



<MyContext2.Provider value={[state2,dispatch2]}>
<Ping MyContext2={MyContext2}/>
</MyContext2.Provider>

           </Route> 

<Route exact path="/:id" 
>

<StateContext.Consumer>{



context => (<MyContext.Provider value={[state2, dispatch2]}>
            <React.Fragment>
                <PatientPage settingpatient={fetchPatient} context={context}/>
            </React.Fragment>
            </MyContext.Provider>
        )

}</StateContext.Consumer>
   </Route>      

            <Route exact path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
