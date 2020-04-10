export const SET_OPEN_PRODUCT_DIALOG = '[PRODUCT DIALOG] SET OPEN';

export function setOpenDialog(open, data = {}) {
  return dispatch => {
    dispatch({ 
      type: SET_OPEN_PRODUCT_DIALOG, 
      payload: {
        open,
        data
      } 
    })
  }
}