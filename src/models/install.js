import { query }  from '../services/install';
import moment from 'moment';

export default {

  namespace: 'install',

  state: {
    list : [],
    loading : false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // dispatch({type:'query' , payload : "Query Demo Started"});
    },
  },

  effects: {
    *queryByNodeId({ payload : nodeId }, { call, put , select }) {
      yield put({type:'sendRequest', payload:{loading : true}});
      try {
        const { jsonResult } = yield call(query , nodeId );
        if(jsonResult){
          let list = jsonResult.list;
          yield put({ type : 'getInstallSuccess' , payload : { list , loading : false }})
        }
        return false
      } catch (error) {
        return false
      }
    },
  },

  reducers: {
    sendRequest(state, action) {
      return { ...state, ...action.payload };
    },

    getInstallSuccess(state, action) {
      return { ...state, ...action.payload };
    }
  }

}
