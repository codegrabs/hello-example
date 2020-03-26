import ENV from "../enviornment/envornment";
class Api{
    
    static checkEmpty=(params)=>{
        return !Object.keys(params).length === 0 && params.constructor === Object;
      }
      
      objToQueryString = obj => {
        const keyValuePairs = [];
        for (let i = 0; i < Object.keys(obj).length; i += 1) {
          keyValuePairs.push(
            `${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(
              Object.values(obj)[i],
            )}`,
          );
        }
        return keyValuePairs.join('&');
      };

      
       static async get(url,params={},test=false){
            let callUrl=ENV.url+url;
        
            if (this.checkEmpty(params)) {
                callUrl += '?' + this.objToQueryString(params);
              }

              if(test){
                callUrl=url;
            }

            try {
                let response = await fetch(callUrl);
                let responseJson = await response.json();
                console.log('url: ',callUrl,'responseJson: ',responseJson)
                return responseJson;
              } catch (error) {
                console.error(error);
              }
        }

        static async post(url,params){
            let callUrl=ENV.url+url;

            try {
                let reqBody = {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                };
                if (!this.checkEmpty(params)) {
                  reqBody.body = JSON.stringify(params);
                }
                let response = await fetch(callUrl, reqBody);
                let responseJson = await response.json();
                return responseJson;
              } catch (error) {
                console.error('post: ', error);
              }
           
        }
}

export default Api;
