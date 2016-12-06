import { query , remove }  from '../services/demo';

export default {

  namespace: 'demo',

  state: {
    list : [],
    loading : false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({type:'queryDemo' , payload : "Query Demo Started"});
    },
  },

  effects: {
    *queryDemo({ payload }, { call, put }) {
      yield put({type:'sendRequest', payload:{loading : true}});
      try {
        const { jsonResult } = yield call(query);
        if(jsonResult){
          yield put({ type : 'getUserSuccess' , payload : { list : jsonResult , loading : false }})
        }
        return false
      } catch (error) {
        return false
      }
    },

    *removeDemo({ payload } , { call , put }){
      try {
        const { id } = payload ;
        const { jsonResult } = yield call(remove, id );
        if(jsonResult){
           yield put({ type : 'queryDemo' })
        }
        return false
      } catch (error) {
        return false
      }
    }
  },

  reducers: {
    sendRequest(state, action) {
      return { ...state, ...action.payload };
    },

    getUserSuccess(state, action) {
      return { ...state, ...action.payload };
    },

    stopRequest(state, action) {
      return { ...state, loading : false };
    }
  }

}
