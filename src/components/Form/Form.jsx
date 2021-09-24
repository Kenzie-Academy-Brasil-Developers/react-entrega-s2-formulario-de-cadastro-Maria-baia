import { Input, Grid, Button } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import {useState} from "react"
import { useHistory } from 'react-router';

function Form({classes}){

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

    const onSubmitFunction = (data) => {
        setData(data.name)
        history.push(`/${data.name}`)
    }

    const [data, setData] = useState([])
    let history = useHistory()

    return(
        <Grid component="form"
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            onSubmit={handleSubmit(onSubmitFunction)}
            >
              <Input
              className={classes.input}
              placeholder="Nome" {...register("name")}/>
                <span className={classes.error}>{errors.name?.message}</span>
              <Input 
              className={classes.input}
              placeholder="E-mail" {...register("email")}/>
                <span className={classes.error}>{errors.email?.message}</span>
              <Input type="password"
              className={classes.input}
              placeholder="Senha" {...register("password")}/>
                <span className={classes.error}>{errors.password?.message}</span>
              <Input type="password"
              className={classes.input}
              placeholder="Confirmar Senha" {...register("passwordConfirms")}/>
                <span className={classes.error}>{errors.passwordConfirms?.message}</span>
              <Button className={classes.button}
              type="submit">CADASTRAR</Button>
        </Grid>
    )
}

export default Form