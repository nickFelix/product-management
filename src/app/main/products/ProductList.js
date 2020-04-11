import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import ProductItem from './ProductItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '@now/components/products/products.actions';
import FuseLoading from '@fuse/core/FuseLoading';

const useStyles = makeStyles((theme) => ({
  productRow: {
    marginBottom: 30,
    padding: '0 25px'
  }
}));

export default function ProductList() {

  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products.products);
  const loading = useSelector(({ products }) => products.loading);

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

      {

        loading ?
          <FuseLoading /> :

          newProducts.map((e, index) => {
            return (

              <Paper key={index} className={classes.productRow}>
                <Grid container spacing={3}>
                  {
                    e.map((element, innerIndex) => (
                      <Grid item xs={2} key={innerIndex}>
                        <ProductItem
                          id={element.id}
                          name={element.name}
                          image={element.imgUrl}
                          imageName={element.fileName}
                          status={element.status}>
                        </ProductItem>
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