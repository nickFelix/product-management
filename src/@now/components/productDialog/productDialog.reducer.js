import * as actions from './productDialog.action';

const initialState = {
  data: {
    productId: '',
    productName: '',
    fileName: '',
    file: '',
    status: ''
  },
  open: false
}

const productDialog = (state = initialState, action) => {

  switch (action.type) {
    case actions.SET_OPEN_PRODUCT_DIALOG:

      return {
        open: action.payload.open,
        data: action.payload.data
      };

    default:
      return state
  }

}

export default productDialog