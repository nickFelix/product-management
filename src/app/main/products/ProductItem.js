import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import * as productDialogActions from '@now/components/productDialog/productDialog.action';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    border: 'none',
    cursor: 'pointer'
  },
  productName: {
    marginTop: 10,
    textAlign: 'center'
  },
  productImg: {
    maxHeight: 100,
    margin: '0px auto'
  }
}));

export default function ProductItem(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditProduct = function () {
    dispatch(productDialogActions.setOpenDialog(true, {
      productId: props.id,
      productName: props.name,
      fileName: props.imageName,
    }))
  }

  return (
    <Card variant="outlined" className={classes.cardWrapper}>
      <CardContent onClick={handleEditProduct}>
        <img src={props.image} className={classes.productImg} />
        <Typography variant="h5" className={classes.productName}>{props.name}</Typography>
      </CardContent>
    </Card>
  )
}