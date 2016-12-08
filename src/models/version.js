import { query }  from '../services/version';
import moment from 'moment';


const filterByDate = (queryDate , list) => {
  const filterList = list.filter((item) => {
    return item.year === queryDate.year() && item.month === queryDate.month() + 1
  });
  return filterList;
}

export default {

  namespace: 'version',

  state: {
    data : [],
    list : [],
    loading : false,
    dateQuery : moment(new Date(), 'YYYY-MM-DD')
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

          yield put({ type : 'getVersionData' , payload : { data : list }})
          const dateQuery = yield select((state) => state.version.dateQuery);
          if(dateQuery){
            list = filterByDate(dateQuery , list);
          }
          yield put({ type : 'getVersionSuccess' , payload : { list , loading : false }})
        }
        return false
      } catch (error) {
        return false
      }
    },

    *queryDateChange({ payload }, { call, put ,select }) {

      const { dateQuery } = payload;
      if(dateQuery){
        yield put({ type : 'setDataQuery' , payload })
      }
      const version = yield select((state) => state.version.data);
      const filterList = filterByDate(dateQuery , version);
      yield put({ type : 'changeListForFilter' , payload :{ list : filterList } })
    },
  },

  reducers: {
    sendRequest(state, action) {
      return { ...state, ...action.payload };
    },

    getVersionSuccess(state, action) {
      return { ...state, ...action.payload };
    },

    setDataQuery(state, action){
      return { ...state, ...action.payload };
    },

    getVersionData(state, action){
      return { ...state, ...action.payload };
    },

    changeListForFilter(state, action){
      return { ...state, ...action.payload };
    }
  }

}
