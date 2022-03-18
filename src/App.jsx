import { useState, useContext } from 'react'
import axios from "axios";
import { Dust } from './store/Store'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

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
      const data = response.data;
      setIsLoading(false);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  
  const { dust, cotextDispatch } = useContext(Dust);


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
          <div>
            <p>{dust.dust}</p>
            <div>{ dust.ultradust}</div>
          </div>
        )}
    </div>
  );
}

export default App;
