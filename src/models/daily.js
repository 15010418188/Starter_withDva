import { query }  from '../services/daily';
import moment from 'moment';

const filterByDate = (queryDate , list) => {
  const [start , end ] = queryDate
   const filterList = list.filter((item) => {
    const itemDate = moment(`${item.year}-${item.month}-${item.day}`, "YYYY-MM-DD");
    return itemDate.isBetween( start , end );
  });
  return filterList;
}

export default {

  namespace: 'daily',

  state: {
    data : [],
    list : [],
    loading : false,
    dateQuery : [ moment(new Date(), 'YYYY-MM-DD').day(-30) , moment(new Date(), 'YYYY-MM-DD') ]
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

          yield put({ type : 'getDailyData' , payload : { data : list }})
          const dateQuery = yield select((state) => state.daily.dateQuery);
          if(dateQuery){
            list = filterByDate(dateQuery , list);
          }
          yield put({ type : 'getDailySuccess' , payload : { list , loading : false }})
        }
        return false
      } catch (error) {
        return false
      }
    },

    *queryDateChange({ payload }, { call, put ,select }) {
      const { dateQuery } = payload;
      if(dateQuery.length !== 0){
        yield put({ type : 'setDataQuery' , payload })
      }
      const monthly = yield select((state) => state.daily.data);
      const filterList = filterByDate(dateQuery , monthly);
      yield put({ type : 'changeListForFilter' , payload :{ list : filterList } })
    },
  },

  reducers: {
    sendRequest(state, action) {
      return { ...state, ...action.payload };
    },

    getDailySuccess(state, action) {
      return { ...state, ...action.payload };
    },

    setDataQuery(state, action){
      return { ...state, ...action.payload };
    },

    getDailyData(state, action){
      return { ...state, ...action.payload };
    },

    changeListForFilter(state, action){
      return { ...state, ...action.payload };
    }
  }

}
