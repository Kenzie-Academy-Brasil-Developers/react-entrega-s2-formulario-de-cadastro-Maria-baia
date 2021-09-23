import './App.css';
import * as yup from 'yup'
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import {useHistory, Switch, Route} from "react-router-dom"
import {useState} from "react"
import Login from './components/Login/Login';
import { Input, Grid, Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles"

function App() {
  const useStyles = makeStyles({
    App:{
      backgroundColor: "#cb997e",
      color: "#6b705c",
    },

    input:{
      margin: '10px 0px',
      color: "#ffe8d6",
    },

    button:{
      margin: "10px 0",
    },
  })

  const classes = useStyles()

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!").matches("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", "Nome inválido."),
    email: yup.string().required("E-mail obrigatório!").email("E-mail inválido."),
    password: yup.string().required("Senha obrigatóiria!").matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$", "Mínimo 8 caracteres, necessário letras, números e ao menos um símbolo."),
    passwordConfirms: yup.string().required("Senha obrigatória!").oneOf([yup.ref("password")], "As senhas não coincidem."),
  })

  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      resolver: yupResolver(formSchema)
    }
  )

  const [data, setData] = useState([])
  let history = useHistory()

  const onSubmitFunction = (data) => {
    setData(data.name)
    history.push(`/${data?.name}`)
  }

  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path="/">
          <Grid component="form"
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            onSubmit={handleSubmit(onSubmitFunction)}
            >
              <Input color="secondary"
              className={classes.input}
              placeholder="Nome" {...register("name")}/>
              {errors.name?.message}
              <Input color="secondary"
              className={classes.input}
              placeholder="E-mail" {...register("email")}/>
              {errors.email?.message}
              <Input color="secondary"
              className={classes.input}
              placeholder="Senha" {...register("password")}/>
              {errors.password?.message}
              <Input color="secondary"
              className={classes.input}
              placeholder="Confirmar Senha" {...register("passwordConfirms")}/>
              {errors.passwordConfirms?.message}
              <Button className={classes.button}
              type="submit">CADASTRAR</Button>
          </Grid>
        </Route>
        <Route exact path="/:data">
          <Login classes={classes}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
