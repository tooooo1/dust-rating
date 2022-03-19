import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { Context } from "../../store/Store"

const Choice = () => {
    let navigate = useNavigate();
    const { place, contextDispatch } = useContext(Context);

    return (
        <Positioner>
            <div>
                먼지랭킹 {place}
                <div>
                    <select>
                        <option value="서울">서울</option>
                        <option value="부산" onClick={()=>contextDispatch({type:"부산", value:"부산"})}>부산</option>
                        <option value="대구">대구</option>
                    </select>
                    <button onClick={() => navigate("/result")}>다음</button>
                    <button onClick={()=>contextDispatch({type:'부산', value:'부산'})}>부산</button>
                </div>
            </div>
        </Positioner>
    )
};

export default Choice;