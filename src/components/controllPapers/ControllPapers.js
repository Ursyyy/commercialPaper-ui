import React, {useEffect, useState} from 'react'
import PaperList from  './paperList'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from "react-router-dom"
import AuthForm from '../Auth'
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


const ControllPapers = ({user, setUser}) => {
    const history = useHistory()
    const [loader, setLoader] = useState(false)
    const classes = makeTheme()
    if(user == null){
        user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            history.replace('/')
            return (
                <AuthForm setUser={setUser}/>
            )
        }
    }
    
    return (
        <div className="controllPapers" >
            <PaperList user={user} loader={setLoader} />
            <Backdrop className={classes.loader} open={loader}>
                <CircularProgress className={classes.circle} />
            </Backdrop>
        </div>
    )
}

export default ControllPapers