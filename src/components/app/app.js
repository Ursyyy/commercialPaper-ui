import React, {useState, useContext} from 'react'
import { Route, Switch } from 'react-router'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Header from '../header'
import AuthForm from '../Auth'
import ControllPapers from '../controllPapers'
import Store, { Context } from '../storage/Context'

import './app.css'

const App = () => {
    // const [user, setUser] = useState(null)
    const [state, dispatch] = useContext(Context)

    const closeSnackbar = () => {
        dispatch({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: false,
                text: '',
                type: 'success'
            }
        })
    }

    return (
        <div className="app">
            <Header/>
            <Switch>
                <Store>
                    <Route exact path="/">
                        <AuthForm/>
                    </Route>
                    <Route path="/papers">
                        <ControllPapers/>
                    </Route>
                </Store>
            </Switch>
            <Snackbar open={state.snackbar.isOpen} autoHideDuration={3000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={state.snackbar.type}>
                    {state.snackbar.text}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default App