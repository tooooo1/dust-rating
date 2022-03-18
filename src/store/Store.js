import React, { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
    dust: 0,
    ultraDust: 0,
}

const reducer = (state, actions) => {
        switch (actions.type) {
            case "DUST":
                return {
                    ...state,
                    dust: actions.value,
                };
            case "ULTRA":
                return {
                    ...state,
                    ultraDust: actions.value,
                };
            default:
                return state;
        }
    };

const Store = ({ children }) => {
    const [state, contextDispatch] = useReducer(reducer, initialState);


    return (
        <Context.Provider dust={{ state, contextDispatch }}>{ children }</Context.Provider>
    );
};

export default Store;