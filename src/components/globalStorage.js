import { useState, useEffect } from 'react'

function GlobalState(initialValue) {
    this.value = initialValue 
    this.subscribers = []    

    this.getValue = function () {
        return this.value
    }

    this.setValue = function (newState) {
        if (this.getValue() === newState) {
            return
        }

        this.value = newState
        this.subscribers.forEach(subscriber => {
            subscriber(this.value)
        })
    }

    this.delete = function () {
        this.subscribers.forEach(subscriber => {
            subscriber.sendDeleteSignal();
        });
    }
    
    this.subscribe = function (itemToSubscribe) {
        if (this.subscribers.indexOf(itemToSubscribe) > -1) {
            return
        }
        this.subscribers.push(itemToSubscribe)
    }

    this.unsubscribe = function (itemToUnsubscribe) {
        this.subscribers = this.subscribers.filter(
            subscriber => subscriber !== itemToUnsubscribe
        )
    }
}

function useGlobalState(globalState) {
    const [, setState] = useState();
    const state = globalState.getValue();

    function reRender(newState) {
        // This will be called when the global state changes
        setState({});
    }

    useEffect(() => {
        // Subscribe to a global state when a component mounts
        globalState.subscribe(reRender);

        return () => {
            // Unsubscribe from a global state when a component unmounts
            globalState.unsubscribe(reRender);
        }
    })

    function setState(newState) {
        // Send update request to the global state and let it 
        // update itself
        globalState.setValue(newState);
    }

    return [State, setState];
}

const useGlobalStorage = useGlobalState(new GlobalState({
    snackbar: {
        isOpen: false,
        text: '',
        type: 'success'
    },
    user: {
        name: '',
        company: ''
        }   
    }))

export { useGlobalStorage }