import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import ProductItem from './ProductItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '@now/components/products/products.actions';

const useStyles = makeStyles((theme) => ({
  productRow: {
    marginBottom: 30,
    padding: '0 25px'
  }
}));


export default function ProductList() {

  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products.products)

  let newProducts = [];
  const classes = useStyles();

  useEffect(() => {
    // Run! Like go get some data from an API.
    dispatch(productActions.listProducts());
  }, []);

  for (let index = 0; index < products.length; index += 6) {
    const element = products[index];

    newProducts.push(products.slice(index, index + 6));

  }

  return (
    <Grid item md={12}>

      {newProducts.map((e, index) => {
        return (

          <Paper key={index} className={classes.productRow}>
            <Grid container spacing={3}>
              {
                e.map((element, innerIndex) => (
                  <Grid item xs={2} key={innerIndex}>
                    <ProductItem name={element.name} image={element.imgUrl}></ProductItem>
                  </Grid>
                ))
              }
            </Grid>
          </Paper>
        )
      })}
    </Grid>
  )

}