import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'

const daily = {
  query : async (nodeId ) =>{
    return xFetch(`${apiUrl}/daily/${nodeId}`)
  }
}
export default daily;
