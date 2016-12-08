import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'
const demo = {
  query : async (query) =>{
    return xFetch(`${apiUrl}/companies`)
  },
  update : async(currentItem) =>{
    console.log("update" , currentItem);
    const option = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentItem),
      };
    return xFetch(`${apiUrl}/companies/${currentItem.id}` , option);
  }
}
export default demo;
