import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import ProductItem from './ProductItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  productRow: {
    marginBottom: 30,
    padding: '0 25px'
  }
}));

const products = [
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  },
  {
    "name": "Papel",
    "imgUrl": "https://storage.googleapis.com/download/storage/v1/b/now-test-76d4b.appspot.com/o/products%2F0e41KlRyxcapOQ1LczPa%2FIMG-20181128-WA0173.jpg?generation=1586462294632798&alt=media"
  }
]

export default function ProductList() {

  let newProducts = [];
  const classes = useStyles();

  for (let index = 0; index < products.length; index += 6) {
    const element = products[index];

    newProducts.push(products.slice(index, index + 6));

  }

  console.log(newProducts);

  return (
    <Grid item md={12}>

      {newProducts.map((e, index) => {
        return (

          <Paper key={index} className={classes.productRow}>
            <Grid container spacing={3}>
              {
                e.map((element, innerIndex) => (
                  <Grid item xs={2}>
                    <ProductItem key={innerIndex} name={element.name} image={element.imgUrl}></ProductItem>
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