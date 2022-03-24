import React, { createContext, useReducer } from "react";
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

const initialState = {
    place: '선택',
}

const reducer = (state, actions) => {
    return {
        ...state,
        place: actions.value,
    };
};

city.map((i) => {
    let dustState = {
        time: i.response.body.items[4].dataTime,
        place: i.response.body.items[4].sidoName,
        dust: i.response.body.items[4].pm10Value,
        grade: (parseInt(i.response.body.items[4].pm10Grade) + parseInt(i.response.body.items[4].pm25Grade)) / 2,
        ultraDust: i.response.body.items[4].pm25Value,
        totalValue: (parseInt(i.response.body.items[4].pm10Value) + parseInt(i.response.body.items[4].pm25Value)) / 2,
        detail: i.response.body.items
    }
    cityDustList.push(dustState);
    return 0;
})

cityDustList.sort((a, b) => a.totalValue - b.totalValue);

const Store = ({ children }) => {
    const [state, contextDispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider
            value={{ place: state.place, cityDustList, contextDispatch }}
        >
            {children}
        </Context.Provider>
    );
};

export default Store;