import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
import { findAllByDisplayValue } from '@testing-library/dom';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	noPaper: {
		margin: "75px 150px",
		display: 'grid',
		minHeight: 100,
		borderRadius: 10,
		backgroundColor: '#F5F5F599',
		border: "dashed 2px #90909090",
		padding: 25,
		textAlign: 'center'
	},
	noPaperText: {
		fontSize: 22,
    	margin: 'auto'
	},
	noPaperButton: {
		margin: 'auto',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		padding: '5px 20px',
		maxWidth: 250
	},
	container: {
		// padding: 15,
		margin: 'auto'
	},
	button: {
		color: "#00add8a0",
		//   marginLeft: '70%'
	},
	dialogItem: {
		minWidth: 350
	}

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

const PaperList = () => {
	
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = useState([])
	const [paperHistory, setPaperHistory] = useState([])    
	const [openHistory, setOpenHistory] = useState(false)
	const user = {
		name: "Alex",
		company: 'magnetocorp'
	}
	const openIssueMenu = () => {
		setOpen(!open);
		console.log(open)
	};

	const handleClose = (event) => {
		setOpenHistory(false)
	};
	
	const allPapers = async () => {
		const resp = await axios.post('http://localhost:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: 'all'
		})
		setRows(resp.data)
	}

	const viewPaperHistory = async paperNo => {
		const resp = await axios.post('http://localhost:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: paperNo
		},  { headers: {
			'Content-Type': 'application/json;charset=UTF-8',
      		"Access-Control-Allow-Origin": "*",
		}})
		console.log(resp)
		const data = resp.data
		let resultHistory = []
		const lastItem = data.reverse()[0]
		for(let item of data){
			resultHistory.push(
				(<div key={item.TxId}>
					<Typography>Status: {item['Value']['currentState']}</Typography>
					<Typography>Time: {item['Timestamp'].replace(/[T|Z]/gm, ' ')}</Typography>
					<Typography>Issued date: {item['Value']['issueDateTime']}</Typography>
					<Typography>Price: {item['Value']['faceValue']}</Typography>
					<Typography>Owner: {item['Value']['owner']}</Typography>
					{item !== lastItem ? <></> : <Typography>&#8203;</Typography>}
				</div>)
			)
		}
		setPaperHistory(['Paper #' + paperNo, resultHistory])
		handleClickOpen()
	}

	const issuePaper = async paper => {
		setOpen(false)
		let resp = await axios.post('http://localhost:3000/api/issue', paper)
		let temp = rows
		setRows(temp.push(resp.data))
	}

	const handleClickOpen = () => {
		setOpenHistory(true);
	  };

	const handleCloseHistory = () => {
		setPaperHistory('')
		setOpenHistory(false)
	}

	useEffect( () => {
		allPapers()
	}, [])

	return (
		<Container className={classes.container}>
			{rows.length ? 
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
											{ user.company == 'magnetocorp' ?
												<Button 
													onClick={() => viewPaperHistory(row.Record.paperNumber)} 
													variant="outlined" 
													>
													History
												</Button> :
												row.Record.owner === 'magnetocorp' ? 
												<Button 
													variant="outlined" 
													color="primary"
													className={classes.button}
													// onClick={allPapers}
													>
													Buy
												</Button> : 
												<Button 
													variant="outlined" 
													color="secondary"
													// onClick={allPapers}
													>
													Redeem
												</Button>
												
											}
										</TableCell>

									</TableRow>
								);
								})}
								{user.company == 'magnetocorp' ? 
									<TableRow >
										<TableCell colSpan={7} align='center'>
											<Button 
												onClick={openIssueMenu} 
												variant="outlined" 
												// onClick={() => viewPaperHistory(row.Record.paperNumber)}
												>
												Issue a new paper
											</Button>
										</TableCell>
									</TableRow>:
									<></>
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>:
				<div>
					<Paper 
						className={classes.noPaper}
						elevation={1}>
						<p className={classes.noPaperText}>Magnetocorp has not issued a paper yet</p>
						{user.company == 'magnetocorp' ? 
							<Button 
								className={classes.noPaperButton}
								onClick={openIssueMenu} 
								variant="outlined" 
								// onClick={() => viewPaperHistory(row.Record.paperNumber)}
								>
								Issue a new paper
							</Button> : <></>}
					</Paper>
				</div>
			}
	
			<Dialog
				className={classes.dialogItem}
				open={openHistory}
				onClose={handleCloseHistory}
				scroll={'paper'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title">{paperHistory[0]}</DialogTitle>
				<DialogContent dividers={true} className={classes.dialogItem}>
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
			{open ? <AddPaperBlock addPaper={issuePaper} lastPaper={rows.reverse()[0]} isOpen={open} close={openIssueMenu}/> : <></>}
	   </Container>
	)
}

export default PaperList