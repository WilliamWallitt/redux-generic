import React, {useEffect} from "react";
import {action, getEntireState, getState} from "./redux/redux";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import "./styles.css"

export const Component = () => {

    // lets get some part / all of our state (this is NOT a static thing, updates when we dispatch a command that changes it)
    const state = useAppSelector(getEntireState)
    // lets create our dispatch
    const dispatch = useAppDispatch()
    // lets call a state action -> we pass in our action payload -> what to update the state with
    const updateState = () => dispatch(action({}))
    // lets call a async state action
    useEffect(() => {
        dispatch(getState())
    }, [])

    return (
        <div>
            <h1>I'm a connected component :)</h1>
        </div>
    )

}
