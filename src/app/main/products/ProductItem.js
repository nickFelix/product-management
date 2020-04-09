import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    border: 'none',
    cursor: 'pointer'
  },
  productName: {
    marginTop: 10
  }
}));

export default function ProductItem(props) {

  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.cardWrapper}>
      <CardContent>
        <img src={props.image}/>
        <Typography variant="h5" className={classes.productName}>{props.name}</Typography>
      </CardContent>
    </Card>
  )
}