import React, { createContext } from "react";
import axios from "axios";

let data = '';
const API_KEY = process.env.REACT_APP_API_KEY;
const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'; /*URL*/
var queryParams = '?' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('서울'); /**/
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

export const Context = createContext();
// const initialState = {
//     dust: data.list[0].pm10Value,
//     ultraDust: data.list[0].pm25Value,
// }

// const reducer = (state, actions) => {
//         switch (actions.type) {
//             case "DUST":
//                 return {
//                     ...state,
//                     dust: actions.value,
//                 };
//             case "ULTRA":
//                 return {
//                     ...state,
//                     ultraDust: actions.value,
//                 };
//             default:
//                 return state;
//         }
//     };

const Store = ({ children }) => {
    // const [state, contextDispatch] = useReducer(reducer, initialState);
    const initialState = {
    dust: data.list[0].pm10Value,
    ultraDust: data.list[0].pm25Value,
    }

    return (
        <Context.Provider initialState={initialState}>{ children }</Context.Provider>
    );
};

export default Store;