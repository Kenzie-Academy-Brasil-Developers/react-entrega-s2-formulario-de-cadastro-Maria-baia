import './App.css';
import { Switch, Route} from "react-router-dom"
import Login from './components/Login/Login';
import {makeStyles} from "@material-ui/styles"
import Form from './components/Form/Form';

function App() {
  const useStyles = makeStyles({
    App:{
      backgroundColor: "#264653",
      color: "#2a9d8f",
    },

    input:{
      margin: '10px 0px',
      color: "#ffe8d6",
    },

    button:{
      margin: "10px 0",
    },

    error:{
      color:"#e76f51"
    },
  })

  const classes = useStyles()

  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path="/">
          <Form classes={classes}/>
        </Route>
        <Route exact path="/:data">
          <Login classes={classes}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
