import React, {useState} from 'react'
import LoginForm from './loginForm'
import RegistrationForm from './registrationForm'

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';

const makeTheme = makeStyles( theme => ({
    loader:{
        zIndex:"12"
    },
    circle:{
        color: '#fff',
        width: 50,
        height: 50
    }
}))

const AuthForm = ({setUser}) => {
    const [auth, setAuth] = useState(false)
    const [loader, setLoader] = useState(false)
    // const history = useHistory()
    const classes = makeTheme()
    const changeAuthForm = () => {
        setAuth(!auth)
    } 

    return (
        <div>
            {auth ? <RegistrationForm changeAuth={changeAuthForm} loader={setLoader}/> : <LoginForm changeAuth={changeAuthForm} loader={setLoader}/>}
            <Backdrop className={classes.loader} open={loader}>
                <CircularProgress className={classes.circle} />
            </Backdrop>
        </div>
    )
}

export default AuthForm