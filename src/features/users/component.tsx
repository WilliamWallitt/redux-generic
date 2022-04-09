import React, {useEffect} from "react";
import {setUserInput, getEntireState, getState, getUser} from "./redux/redux";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import "./styles.css"

export const Component = () => {

    // lets get some part / all of our state (this is NOT a static thing, updates when we dispatch a command that changes it)
    const state = useAppSelector(getEntireState)
    // lets create our dispatch
    const dispatch = useAppDispatch()
    // lets call a state action -> we pass in our action payload -> what to update the state with
    const updateUserInput = (userInput: number) => dispatch(setUserInput({
        userInput: userInput
    }))
    // lets call a async state action
    useEffect(() => {
        dispatch(getState())
    }, [])

    useEffect(() => {
        console.log(state.userInput)
    })

    return (

        <div style={{display: "flex", border: "3px dotted black", backgroundColor: "black", color: "white", flexWrap: "wrap"}}>
            <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
                <div>
                    <h1>Find a user (id)</h1>
                    <p>Yes you can build a dropdown, but im lazy</p>
                    <input type={"number"} onChange={(e) => updateUserInput(parseInt(e.target.value))}/>
                    <button onClick={() => state.userInput && dispatch(getUser(state.userInput))}>Submit</button>
                </div>
            </div>
            <div className="table">
                <h1>Current user</h1>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {state.user &&
                    <tr>
                        <td>{state.user.id}</td>
                        <td><code>{state.user.name}</code></td>
                        <td>{state.user.email}</td>
                    </tr>
                    }
                </table>

                <h1>All users</h1>

                <table>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {state.users !== [] ? state.users.map(x => {
                        return (
                            <tr>
                                <td>{x.id}</td>
                                <td><code>{x.name}</code></td>
                                <td>{x.email}</td>
                            </tr>
                        )
                    }) :
                    <h1>Loading...</h1>}
                </table>
            </div>
        </div>

    )

}
