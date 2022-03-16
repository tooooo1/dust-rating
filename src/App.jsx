import { useState } from 'react'
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty'; /*URL*/
  var queryParams = '?' + encodeURIComponent('serviceKey') + '='+API_KEY; /*Service Key*/
  queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent('종로구'); /**/
  queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY'); /**/
  console.log(url+queryParams);
  axios.get(url + queryParams)
    
    .then((response) => {
      response.setHeader("Access-Control-Allow-Origin", "*");
      const data = response.data;
      setIsLoading(false);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
  })


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
          <div></div>
        )}
    </div>
  );
}

export default App;
