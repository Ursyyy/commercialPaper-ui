import React, {createContext, useReducer} from "react"
import Reducer from './Reducer'


const initialState = {
    snackbar: {
        isOpen: false,
        text: '',
        type: 'success'
    },
    user: {
        name: '',
        company: ''
    },
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}
export {initialState}
export const Context = createContext(initialState)
export default Store