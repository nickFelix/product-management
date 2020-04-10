import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProductDialog from '../products/ProductDialog';
import ProductList from '../products/ProductList';
import Icon from '@material-ui/core/Icon'
import { useDispatch } from 'react-redux';
import * as productDialogActions from '@now/components/productDialog/productDialog.action';

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
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		dispatch(productDialogActions.setOpenDialog(true));
	}

	return (
		<div>
			<Grid container justify="space-between" className={classes.header}>
				<Grid item >
					<Typography variant="h5">Catálogo de produtos</Typography>
				</Grid>
				<Grid item>
					<Button startIcon={<Icon>add</Icon>} onClick={handleClickOpen}>Produto</Button>
					<ProductDialog />
				</Grid>
			</Grid>
			<Grid container className={classes.body}>
				<ProductList></ProductList>
			</Grid>
		</div>
	);
}

export default ExamplePage;
