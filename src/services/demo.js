import xFetch from '../utils/xFetch';
import { apiUrl } from '../utils/constant'
const demo = {
  query : async (query) =>{
    return xFetch(`${apiUrl}/demos/`)
  },
  remove : async(id) => {
    const option = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    }
    return xFetch(`${apiUrl}/demos/${id}`, option);
  }
}
export default demo;
