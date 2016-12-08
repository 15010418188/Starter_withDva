import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'

const install = {
  query : async (nodeId ) =>{
    return xFetch(`${apiUrl}/install/${nodeId}`)
  }
}
export default install;
