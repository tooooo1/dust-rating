import { Positioner } from '../../components/Wrapper/styled'

const Result = () => {
    return (
        <Positioner>
            <div>
                미세먼지 정보
                <div style={{marginTop:"20px"}}>
                    미세먼지 : 레벨 1
                    <div>
                        초미세먼지 : 레벨 4
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    총 레이팅 2<br /><br/>
                    산책하세염~~
                </div>
            </div>
        </Positioner>
    )
};

export default Result;