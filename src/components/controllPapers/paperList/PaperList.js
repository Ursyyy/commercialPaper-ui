import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddPaperBlock from '../addPaperBlock'

import '../controllPapers.css'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		// height: 'auto',
		// minHeight: 165,
		// width: 220,
		// maxWidth: 220,
		// padding: 10
	},
	container:{
		// padding: 15,
		margin: 'auto'
	},
	button:{
		color: "#00add8a0",
		//   marginLeft: '70%'
	},

}));

const columns = [
	{ id: 'paperNumber', label: 'PaperNo', minWidth: 100 },
	{ id: 'issueDateTime', label: 'Issue Date', minWidth: 100 },
	{ id: 'issuer', label: 'Issuer', minWidth: 100 },
	{
		id: 'owner',
		label: 'Owner',
		minWidth: 100
	},
	{
		id: 'maturityDateTime',
		label: 'Maturity Date Time',
		minWidth: 100
	},
	{
		id: 'faceValue',
		label: 'Price',
		minWidth: 100
	},
	{
		id: 'button',
		label: '',
		minWidth: 80
	}
  ];

// {
//     TxId: 'f8a6af9b1be6e58ba97f5a0e2e0e305f39b5df45d904b7e7ecd93fad32b86337',
//     Timestamp: '2021-04-08T08:10:44.252Z',
//     Value: {
//       class: 'org.papernet.commercialpaper',
//       currentState: 'ISSUED',
//       issuer: 'magnetocorp',
//       paperNumber: '00003',
//       issueDateTime: '2020-05-31',
//       maturityDateTime: '2020-11-30',
//       faceValue: 50,
//       mspid: 'Org2MSP',
//       owner: 'magnetocorp'
//     }  
// }

const PaperList = ({user}) => {
	let arr = [
		{
			Key: '\x00org.papernet.paper\x00magnetocorp\x0000007\x00',
			Record: {
				class: 'org.papernet.commercialpaper',
				currentState: 1, //4 - redeemed, 3 - traiding, 2 - not exist, 1 - issued
				faceValue: 50,
				issueDateTime: '2020-05-31',
				issuer: 'magnetocorp',
				maturityDateTime: '2020-11-30',
				mspid: 'Org2MSP',
				owner: 'magnetocorp',
				paperNumber: '00001'
			}
		},
		{
			Key: '\x00org.papernet.paper\x00magnetocorp\x0000008\x00',
			Record: {
				class: 'org.papernet.commercialpaper',
				currentState: 1, 
				faceValue: 50,
				issueDateTime: '2020-05-31',
				issuer: 'magnetocorp',
				maturityDateTime: '2020-11-30',
				mspid: 'Org2MSP',
				owner: 'magnetocorp',
				paperNumber: '00002'
			}
		},
		{
			Key: '\x00org.papernet.paper\x00magnetocorp\x0000009\x00',
			Record: {
				class: 'org.papernet.commercialpaper',
				currentState: 1, 
				faceValue: 5000000,
				issueDateTime: '2020-05-31',
				issuer: 'magnetocorp',
				maturityDateTime: '2020-11-30',
				mspid: 'Org2MSP',
				owner: 'magnetocorp',
				paperNumber: '00003'
			}
		}   
	] 
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = useState(arr)
	const [paperHistory, setPaperHistory] = useState('')    
	const [openHistory, setOpenHistory] = useState(false)

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event) => {
		setOpenHistory(false)
		setOpen(false);
	};
	
	const allPapers = async () => {
		const resp = await axios.post('http://192.168.88.21:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: 'all'
		})
		console.log(resp)
	}

	const viewPaperHistory = paperNo => {
		axios.post('http://192.168.88.21:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: paperNo
		})
		.then( resp => {
			console.log(resp)
			let data = resp.data,
				resultHistory = ""
			for(let item of data){
				resultHistory += 'Status: ' + item['Value']['currentState']
				resultHistory += '\nTime: ' + item['Timestamp']
				resultHistory += '\nIssued date: ' + item['Value']['issueDateTime']
				resultHistory += '\nPrice: ' + item['Value']['faceValue']
				resultHistory += '\nOwner: ' + item['Value']['owner'] + '\n\n\n'
			}
			setPaperHistory(['Paper #' + paperNo,resultHistory])
			handleClickOpen()
			
		})
		.catch( err => console.log(err))
	}

	const handleClickOpen = () => {
		setOpenHistory(true);
	  };

	const handleCloseHistory = () => {
		setPaperHistory('')
		setOpenHistory(false)
	}

	return (
		<Container className={classes.container}>
			<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						key={column.id}
						align="center"
						style={{ minWidth: column.minWidth }}
						>
						{column.label}
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
					return (
						<TableRow hover role="checkbox" tabIndex={-1} key={row.Key}>
						{columns.map((column) => {
							if(column.id === 'button') return
							const value = row.Record[column.id];
							return (
							<TableCell key={column.id} align='center'>
								{value}
							</TableCell>
							);
						})}
							<TableCell key='button' align='center'>
								<Button 
									onClick={allPapers} 
									variant="outlined" 
									// onClick={() => viewPaperHistory(row.Record.paperNumber)}
									>
									History
								</Button>
							</TableCell>

						</TableRow>
					);
					})}
					<TableRow>
						<TableCell colSpan={3}><AddPaperBlock/></TableCell>
					</TableRow>
				</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination
				// rowsPerPageOptions={[10, 25, 100]}
				// component="div"
				// count={rows.length}
				// rowsPerPage={rowsPerPage}
				// page={page}
				// onChangePage={handleChangePage}
				// onChangeRowsPerPage={handleChangeRowsPerPage}
				/> */}
			</Paper>
			{/* <Paper><AddPaperBlock/></Paper> */}
			<Dialog
				open={openHistory}
				onClose={handleCloseHistory}
				scroll={'paper'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title">{paperHistory[0]}</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText
						id="scroll-dialog-description"
						// ref={descriptionElementRef}
						tabIndex={-1}
					>
						{paperHistory[1]}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
	   </Container>
	)
}

export default PaperList