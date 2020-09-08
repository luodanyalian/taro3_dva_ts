export default {
  namespace: 'toast',
  state: {
    toast: {
      isOpened: false,
      text: '',
      duration: 3000,
      position: 'bottom'
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *setToast({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          toast: payload
        }
      })
    }
  }
}
