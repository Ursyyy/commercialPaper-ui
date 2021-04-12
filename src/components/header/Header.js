import React from 'react'
import { useHistory } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import { makeStyles } from '@material-ui/core/styles';

import './header.css'

const makeTheme = makeStyles( theme => ({
    header:{
        backgroundColor:"#00add8"
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: "2.25rem"
    },

}))

const Header = ({user, setUser}) => {
    const classes = makeTheme()
    const history = useHistory()

    if(user == null){
        user = JSON.parse(localStorage.getItem('user'))
    }
    const logOut = () => {
        setUser(null)
        user = null
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Toolbar >
                <Typography variant="h6" className={classes.title}>
                    MDC
                </Typography>
                {
                    user === null ?
                    <Button 
                        onClick={logOut}
                        color="inherit"
                        >
                            Log in
                    </Button> :
                    <ButtonGroup variant="text">
                        <Button 
                            onClick={logOut}
                            color="inherit"
                            >
                        Log out
                        </Button>
                    </ButtonGroup>
                
                }
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header