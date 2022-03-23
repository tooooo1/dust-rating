import React, { createContext, useReducer } from "react";
// import axios from "axios";
import 서울 from '../json/서울.json'
import 부산 from '../json/부산.json'
import 대구 from '../json/대구.json'
import 인천 from '../json/인천.json'
import 광주 from '../json/광주.json'
import 대전 from '../json/대전.json'
import 울산 from '../json/울산.json'
import 경기 from '../json/경기.json'
import 강원 from '../json/강원.json'
import 충북 from '../json/충북.json'
import 충남 from '../json/충남.json'
import 전북 from '../json/전북.json'
import 전남 from '../json/전남.json'
import 경북 from '../json/경북.json'
import 경남 from '../json/경남.json'
import 제주 from '../json/제주.json'
import 세종 from '../json/세종.json'

const city = [서울, 부산, 대구, 인천, 광주,
    대전, 울산, 경기, 강원, 충북, 충남, 전북,
    전남, 경북, 경남, 제주, 세종];

const cityDustList = [];

export const Context = createContext();
let data = '';
const initialState = {
    place: '서울',
}

const reducer = (state, actions) => {
    return {
        ...state,
        place: actions.value,
    };
};

// const API_KEY = process.env.REACT_APP_API_KEY;
// const url = ''
// var queryParams = 'C:\\Users\\정충일\\Documents\\GitHub\\weather-rating\\public\\json\\'+ encodeURIComponent('서울');
// const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'; /*URL*/
// var queryParams = '?' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('전국'); /**/
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
// queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
// queryParams += '&' + encodeURIComponent('serviceKey') + '=' + API_KEY; /*Service Key*/
// queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /**/

// city.map((i) => {
    // var queryParams = '?' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(i); /**/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
    // queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    // queryParams += '&' + encodeURIComponent('serviceKey') + '=' + API_KEY; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /**/
    // return (
    // axios.get(url + queryParams)
    //         .then((response) => {
    //         console.log(url + queryParams)
            // data = response.data;
            // let dustState = {
            //     place: i,
            //     dust: data.response.body.items[0].pm10Value,
            //     ultraDust: data.response.body.items[0].pm25Value,
            //     totalValue: (parseInt(data.response.body.items[0].pm10Value) + parseInt(data.response.body.items[0].pm25Value))/2
            // };

            // cityDustList.push(dustState);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     )
// })

// console.log("여기", cityDustList)


city.map((i) => {
    let dustState = {
        place: i.response.body.items[0].sidoName,
        dust: i.response.body.items[0].pm10Value,
        ultraDust: i.response.body.items[0].pm25Value,
        totalValue: (parseInt(i.response.body.items[0].pm10Value) + parseInt(i.response.body.items[0].pm25Value)) / 2
    }
    cityDustList.push(dustState)
    return (
        console.log(i)
    
    );
})
console.log(cityDustList)
const sortCity = cityDustList.sort((a, b) => b.totalValue - a.totalValue);


console.log(sortCity)

// console.log("정렬11, ", cityDustList)
// console.log("정렬", sortCity)
// axios.get("https://cors-anywhere.herokuapp.com/" + url + queryParams)
//     .then((response) => {
//         data = response.data;
//         console.log(data);
//         console.log(data.response.body.items[0].pm10Value);
//         console.log(data.response.body.items[0].pm25Value);
//         console.log(cityDustList);
//     })
//     .catch((error) => {
//         console.log(error);
//     })














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