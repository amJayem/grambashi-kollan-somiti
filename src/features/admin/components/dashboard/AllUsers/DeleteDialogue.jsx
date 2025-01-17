import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDeleteUserMutation } from '@/slices/api/apiSlice';
import AlertSuccess from '../../../../../../components/Alert/AlertSuccess';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});

export default function DeleteDialogue({ id, name }) {
	const [open, setOpen] = React.useState(false);
	// const [agree, setAgree] = React.useState(false)

	const [deleteUser, { isSuccess }] = useDeleteUserMutation();

	// console.log(isSuccess)
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAgree = () => {
		setOpen(false);
		deleteUser(id);
	};
	if (isSuccess) {
		return (
			<AlertSuccess
				setOpen={true}
				message={'User Deleted'}
			/>
		);
	}

	return (
		<div>
			<Button
				onClick={handleClickOpen}
				endIcon=''
				size='small'
				// variant='outlined'
				color='error'>
				<DeleteForeverIcon />
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle
					fontWeight={'bold'}
					color={'red'}
					fontSize={19}>
					{'Do you want to delete user?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						{name}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleAgree}>Agree</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
