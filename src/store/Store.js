import React, { createContext, useReducer } from "react";
import axios from "axios";


export const Context = createContext();
let data = '';
const initialState = {
    place: '서울',
}

const reducer = (state, actions) => {
    switch (actions.type) {
        case '서울':
            return {
                ...state,
                place: actions.value,
            };
        case '부산':
            return {
                ...state,
                place: actions.value,
            };
        default:
            throw new Error();
    }
};

const API_KEY = process.env.REACT_APP_API_KEY;
const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'; /*URL*/
var queryParams = '?' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(initialState.place); /**/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
queryParams += '&' + encodeURIComponent('serviceKey') + '=' + API_KEY; /*Service Key*/
queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /**/
console.log("https://cors-anywhere.herokuapp.com/" + url + queryParams);

axios.get("https://cors-anywhere.herokuapp.com/" + url + queryParams)
    .then((response) => {
        data = response.data;
        console.log(data);
        console.log(data.response.body.items[0].pm10Value);
        console.log(data.response.body.items[0].pm25Value);
    })
    .catch((error) => {
        console.log(error);
    })



const Store = ({ children }) => {
    const [state, contextDispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider
            value={{ place: state.place, contextDispatch }}
        >
            {children}
        </Context.Provider>
    );
};

export default Store;