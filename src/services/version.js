import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'
const version = {
  query : async (nodeId ) =>{
    return xFetch(`${apiUrl}/version/${nodeId}`)
  }
}
export default version;
