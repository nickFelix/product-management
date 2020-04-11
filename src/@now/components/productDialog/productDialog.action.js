import axios from 'axios';
import * as generalActions from 'app/store/actions';
import * as productActions from '@now/components/products/products.actions';
import * as productDialogActions from '@now/components/productDialog/productDialog.action';

export const SET_OPEN_PRODUCT_DIALOG = '[PRODUCT DIALOG] SET OPEN';
export const SAVE_PRODUCT = '[PRODUCT] SAVE PRODUCT';

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

export function saveNewProduct(parameters) {

  return (dispatch) => {

    dispatch({
      type: SAVE_PRODUCT
    });

    let formData = new FormData();

    formData.append('imgUrl', parameters.file);
    formData.append('name', parameters.productName);

    axios({
      url: 'product/new',
      method: 'POST',
      data: formData
    }).then(res => {

      dispatch(generalActions.showMessage({ message: "Produto cadastrado com sucesso!" }));
      dispatch(productActions.listProducts());
      console.log('deu certo');

    }, err => {

      console.error('ops, something went wrong ');
      console.error(err);

    });

    dispatch(productActions.addProduct({
      name: parameters.productName,
      imgUrl: parameters.fileUrl,
      fileName: parameters.fileName
    }));

    dispatch(productDialogActions.setOpenDialog(false))

  }

}

export function saveEditProduct(parameters) {
  return (dispatch) => {

    dispatch({
      type: SAVE_PRODUCT
    });

    let formData = new FormData();

    formData.append('id', parameters.productId);
    formData.append('name', parameters.productName);
    formData.append('status', parameters.status);
    formData.append('imgUrl', parameters.file);

    axios({
      url: 'product/edit',
      method: 'PUT',
      data: formData
    }).then(res => {

      dispatch(generalActions.showMessage({ message: "Dados atualizados!" }));
      console.log('deu certo');

    }, err => {

      console.error('ops, something went wrong ');
      console.error(err);

    });

    dispatch(productActions.editProduct({
      id: parameters.productId,
      name: parameters.productName,
      imgUrl: parameters.fileUrl,
      fileName: parameters.fileName,
      status: parameters.status
    }));

    dispatch(productDialogActions.setOpenDialog(false));

  }
}