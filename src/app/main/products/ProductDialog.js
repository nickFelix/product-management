import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import * as productDialogActions from '@now/components/productDialog/productDialog.action';
import Icon from '@material-ui/core/Icon';

const defaultFormState = {
	productId: '',
	productName: '',
	fileName: '',
	file: '',
	status: ''
}

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	uploadInput: {
		width: 300
	},
	btnGroupWrapper: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	}
}));

export default function ProductDialog() {

	const classes = useStyles();
	const open = useSelector(({ productDialog }) => productDialog.open);
	const data = useSelector(({ productDialog }) => productDialog.data);
	const user = useSelector(({ auth }) => auth.user);

	const [form, setForm] = React.useState(defaultFormState);

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
		setForm(defaultFormState);
		dispatch(productDialogActions.setOpenDialog(false));
	};

	const handleImgUpload = (params) => {

		let tmpFile = params.target.files[0];
		let fileName = tmpFile ? tmpFile.name : ''
		let tmpUrl = URL.createObjectURL(tmpFile);

		setForm({
			...form,
			fileName,
			file: tmpFile,
			fileUrl: tmpUrl
		});
	}

	const handleSave = () => {
		if (form.productId) {
			dispatch(productDialogActions.saveEditProduct(form))
		} else {
			dispatch(productDialogActions.saveNewProduct(form))
		}
	}

	const handleSetAnalysis = () => {

		form.status = 'em analise';

		dispatch(productDialogActions.saveEditProduct(form));

	}

	const handleSetReady = (ready) => {

		form.status = ready ? 'aprovado' : 'reprovado';

		dispatch(productDialogActions.saveEditProduct(form));

	}

	const StatusComponent = withStyles(useStyles)((props) => {
		const { status } = props;

		let statusLabel = '';
		let icon = '';

		switch (status) {
			case 'pending':
				statusLabel = 'Pendente';
				icon = 'access_time';
				break;

			case 'em analise':
				statusLabel = 'Em análise';
				icon = 'bar_chart';
				break;

			case 'aprovado':
				statusLabel = 'Aprovado';
				icon = 'check';
				break;

			case 'reprovado':
				statusLabel = 'Reprovado';
				icon = 'close';
				break;


			default:
				break;
		}

		return (
			<span style={{ marginLeft: 5 }}>
				({statusLabel} <Icon style={{ fontSize: 15, display: 'inline-block', marginBottom: '-3px' }}>{icon}</Icon>)
			</span>
		);
	});

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='md' fullWidth={true}>
				<MuiDialogTitle id="form-dialog-title">

					<Typography>{form.productId ? 'Editar' : 'Cadastrar'} Produto

						{form.productId ? <StatusComponent status={form.status} /> : null}

					</Typography>

					<div className={classes.btnGroupWrapper}>
						<ButtonGroup size="small" aria-label="small outlined button group">
							{user.role[0] === 'user' ?
								<Button disabled={form.status !== 'pending' ? true : false}
									onClick={handleSetAnalysis}>Enviar Para análise</Button>
								: null}

							{user.role[0] === 'admin' && form.status !== 'pending' ? <Button onClick={() => { handleSetReady(true) }}>Aprovar</Button> : null}
							{user.role[0] === 'admin' && form.status !== 'pending' ? <Button onClick={() => { handleSetReady(false) }}>Reprovar</Button> : null}

						</ButtonGroup>
					</div>

				</MuiDialogTitle>

				<DialogContent>

					{form.productId ? null :
						<DialogContentText>
							Para cadastrar um novo produto, complete as informações abaixo.
							Todos os produtos são cadastrados com status pendente.
						</DialogContentText>
					}
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