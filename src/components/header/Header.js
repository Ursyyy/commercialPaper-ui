import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
    const logOut = () => {
        setUser(null)
        history.push('/')
    }
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Toolbar >
                <Typography variant="h6" className={classes.title}>
                    MDC
                </Typography>
                {
                    user == null ?
                    <Button 
                        onClick={logOut}
                        color="inherit"
                        >
                            Log in
                    </Button> :
                    <ButtonGroup variant="text">
                        <Button 
                            color="inherit"
                            onClick={handleClick}
                            >
                            Transactions History
                        </Button>
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
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    Will be added in version 1.1
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Header