import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from "./actions";

function ReduxTest(props){

    //var [listDescription, setListDescription] = useState("");
    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    return (<div>
    <h3>Counter {counter}</h3>
    <button onClick={() => dispatch(increment(5))}>+</button>
    <button onClick={() => dispatch(decrement(5))}>-</button>
    {isLogged ? <h3>Valuable Information I Shouldn't see</h3> : ""}
    </div>);
}

export default ReduxTest;