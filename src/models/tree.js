import { query  , update }  from '../services/tree';

export default {

  namespace: 'tree',

  state: {
    treedata : [],
    loading : false,
    selectItem : {},
    selectedKeys: [],
    currentItem : {},
    visible:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch( { type:'query' } );
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({type:'sendRequest', payload:{loading : true}});
      try {
        const { jsonResult } = yield call(query);
        if(jsonResult.success){
          yield put({ type : 'getTreeSuccess' , payload : { treedata : jsonResult.list , loading : false }})
          yield put({ type : 'selectNodeItem',payload : { selectedKeys : [jsonResult.list[0].id]  } });
        }
        return false
      } catch (error) {
        return false
      }
    },

    *update({ payload }, { call, put ,select  }) {
      try {
          const currentItem = yield select((state) => state.tree.currentItem);
          const { jsonResult } = yield call(update , currentItem);
          if(jsonResult){
            yield put({ type : 'refreshTable' });
          }
        return false
      } catch (error) {
        return false
      }
    },

    *refreshTable({ payload }, { call, put }) {
      yield put({type:'query'});
      yield put({type:'hideModal'});
    },

    *startEditItem({ payload : id } , { call , put , select }){
      try {
          const treedata = yield select((state) => state.tree.treedata);
          const [ node ] = treedata.filter((item) => { return item.id === parseInt(id) });
          yield put({ type : 'setCurrentItem',payload : { currentItem : node , visible : true  } });
        return false
      } catch (error) {
        return false
      }
    },
    *selectNodeItem({ payload } , { call , put , select }){
      try {
          const { selectedKeys } = payload;
          if ( selectedKeys.length !== 0 ){
            const nodeId = selectedKeys[0];
            const treedata = yield select((state) => state.tree.treedata);
            const node = treedata.filter((item) => { return item.id === parseInt(nodeId) })[0];
            yield put({ type : 'setNodeItem',payload : { selectItem : node  } });
            yield put({ type : 'daily/queryByNodeId' , payload : nodeId });
            yield put({ type : 'monthly/queryByNodeId' , payload : nodeId });
            yield put({ type : 'install/queryByNodeId' , payload : nodeId });
            yield put({ type : 'version/queryByNodeId' , payload : nodeId });
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

    getTreeSuccess(state, action) {
      return { ...state, ...action.payload };
    },

    setState(state, action) {
      return { ...state, ...action.payload };
    },

    setNodeItem(state, action) {
      return { ...state, ...action.payload };
    },
    setCurrentItem(state, action) {
      return { ...state, ...action.payload };
    },
    hideModal(state, action) {
      return { ...state, visible:false };
    },

    updateCurrentItem(state,action){
      const field = action.payload;
      const result = {};
      _.forOwn(field, function(item, key) {
       result[key] = item.value;
      });
      const currentItem = state.currentItem;
      return {...state , currentItem: _.merge(currentItem,result) } ;
    }
  }

}
