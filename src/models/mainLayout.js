

export default {
  namespace: 'mainLayout',
  state: {
    collapse : false,
    menuMode : 'inline' ,
    showMenu : true ,
  },
  reducers: {
    collapseMenu(state, action) {
      return { ...state, collapse: action.payload };
    },
    changeMenu(state , action ){
      return { ...state , menuMode : action.payload } ;
    },
    showMenu(state ){
      return { ...state , showMenu : true } ;
    },
    hideMenu(state){
      return { ...state , showMenu : false } ;
    }

  },

};
