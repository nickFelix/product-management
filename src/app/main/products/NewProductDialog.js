import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as productActions from '@now/components/products/products.actions';

const defaultFomrtState = {
	productName: '',
	fileName: '',
	file: ''
}

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

export default function NewProductDialog() {

	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [form, setForm] = React.useState(defaultFomrtState);

	const dispatch = useDispatch();

	const handleNameChange = (e) => {
		setForm({
			...form,
			productName: e.target.value
		})
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setForm(defaultFomrtState);
		setOpen(false);
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
		dispatch(productActions.saveNewProduct(form))
	}

	return (
		<div>
			<Button startIcon={<Icon>add</Icon>} onClick={handleClickOpen}>Produto</Button>
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
					<TextField disabled value={form.fileName}></TextField>
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