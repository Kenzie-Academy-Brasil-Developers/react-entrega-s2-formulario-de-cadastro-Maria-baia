import { Grid, Button, Typography, ImageList } from "@material-ui/core"
import { useParams, useHistory } from "react-router-dom"

function Login({classes}){
    const params = useParams()
    const history =useHistory()
    return(
        <Grid container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <Typography gutterBottom="true"
            variant="h2"
            >Bem-vindo(a), {params.data}!</Typography>
            <img src="http://openproducoes.com.br/wp-content/uploads/2016/10/welcome-coffee.jpg"/>
            <Button className={classes.button} onClick={() => history.push("/")}>VOLTAR</Button>
        </Grid>
    )
}

export default Login