import React, {useState} from 'react'
import { Route, Switch } from 'react-router'
import Header from '../header'
import AuthForm from '../Auth'
import ControllPapers from '../controllPapers'
import Context from '../storage/Context'

import './app.css'

const App = () => {
    const [user, setUser] = useState(null)

    const saveUser = (newUser) => {
        setUser(newUser)
    }

    return (
        <div className="app">
            <Header user={user} setUser={saveUser}/>
            <Switch>
                <Route exact path="/">
                    <AuthForm setUser={saveUser}/>
                </Route>
                <Route path="/papers">
                    <ControllPapers user={user}/>
                </Route>
            </Switch>
            
        </div>
    )
}

export default App