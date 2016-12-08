import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'
const monthly = {
  query : async (nodeId ) =>{
    return xFetch(`${apiUrl}/monthly/${nodeId}`)
  }
}
export default monthly;
