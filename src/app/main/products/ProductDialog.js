import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as productActions from '@now/components/products/products.actions';
import * as productDialogActions from '@now/components/productDialog/productDialog.action';

const defaultFomrtState = {
	productId: '',
	productName: '',
	fileName: '',
	file: ''
}

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	uploadInput: {
		width: 300
	}
}));

export default function ProductDialog() {

	const classes = useStyles();
	const open = useSelector(({ productDialog }) => productDialog.open);
	const data = useSelector(({ productDialog }) => productDialog.data);

	const [form, setForm] = React.useState(defaultFomrtState);

	useEffect(() => {
		setForm(data)
	}, [data])

	const dispatch = useDispatch();

	const handleNameChange = (e) => {
		setForm({
			...form,
			productName: e.target.value
		})
	}

	const handleClose = () => {
		setForm(defaultFomrtState);
		dispatch(productDialogActions.setOpenDialog(false));
	};

	const handleImgUpload = (params) => {

		let tmpFile = params.target.files[0];
		let fileName = tmpFile ? tmpFile.name : ''

		if (fileName.endsWith(''))

			setForm({
				...form,
				fileName,
				file: tmpFile
			});
	}

	const handleSave = () => {
		if (form.productId) {
			dispatch(productActions.saveEditProduct(form))
		} else {
			dispatch(productActions.saveNewProduct(form))
		}
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Cadastrar Produto</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Para cadastrar um novo produto, complete as informações abaixo.
						Todos os produtos são cadastrados com status pendente.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="product-name"
						label="Nome"
						type="text"
						fullWidth
						value={form.productName}
						onChange={handleNameChange}
					/>
					<br />
					<br />
					<Button
						component="label"
						startIcon={<CloudUploadIcon />}>
						Upload File
						<input type="file" accept="image/*" id="productImg" style={{ display: "none" }} onChange={handleImgUpload} />
					</Button>
					<TextField disabled value={form.fileName} className={classes.uploadInput}></TextField>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary" className={classes.button}>
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary" startIcon={<SaveIcon />} className={classes.button}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}