import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewProductDialog from '../products/NewProductDialog';
import ProductList from '../products/ProductList';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	header: {
		padding: 20
	},
	body: {
		padding: 20,
	}
}));

function ExamplePage(props) {
	const classes = useStyles(props);

	return (
		<div>
			<Grid container justify="space-between" className={classes.header}>
				<Grid item >
					<Typography variant="h5">Produtos</Typography>
				</Grid>
				<Grid item>
					<NewProductDialog />
				</Grid>
			</Grid>
			<Grid container className={classes.body}>
				<ProductList></ProductList>
			</Grid>
		</div>
	);
}

export default ExamplePage;
