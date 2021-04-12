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
	},
	redeemedPaper:{
		backgroundColor: '#00000033'
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

const PaperList = ({user, loader}) => {
	
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = useState([])
	const [info, setInfo] = useState(['', false])
	const [paperHistory, setPaperHistory] = useState([])    
	const [openHistory, setOpenHistory] = useState(false)
	const openIssueMenu = () => {
		setOpen(!open);
	};

	const handleClose = (event) => {
		setOpenHistory(false)
	};
	
	const allPapers = async () => {
		const resp = await axios.post('http://192.168.88.21:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: 'all'
		})
		setRows(resp.data)
	}

	const viewPaperHistory = async paperNo => {
		
		const resp = await axios.post('http://192.168.88.21:3000/api/history', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			paperNumber: paperNo
		})
		const data = resp.data
		let resultHistory = []
		for(let item of data){
			resultHistory.push(
				(<>
					<Typography>Status: {item['Value']['currentState']}</Typography>
					<Typography>Time: {item['Timestamp'].replace(/[T|Z]/gm, ' ')}</Typography>
					<Typography>Issued date: {item['Value']['issueDateTime']}</Typography>
					<Typography>Price: {item['Value']['faceValue']}</Typography>
					<Typography>Owner: {item['Value']['owner']}</Typography>
					<Typography>&#8203;</Typography>
				</>)
			)
		}
		setPaperHistory(['Paper #' + paperNo, resultHistory])
		handleClickOpen()
	}

	const issuePaper = async paper => {
		loader(true)
		setOpen(false)
		let resp = await axios.post('http://192.168.88.21:3000/api/issue', paper)
		allPapers()
		loader(false)
		setInfo([`Paper with number ${resp.data.Record.paperNumber} has been successfully issued`, true])
	}

	const handleClickOpen = () => {
		setOpenHistory(true);
	  };

	const handleCloseHistory = () => {
		setPaperHistory('')
		setOpenHistory(false)
	}

	const buyPaper = async paper => {
		loader(true)
		let resp = await axios.post('http://192.168.88.21:3000/api/buy', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			...paper
		})
		allPapers()
		loader(false)
		setInfo([`Paper with number ${resp.data.paperNumber} has been successfully bought`, true])
	}

	const redeemPaper = async paper => {
		loader(true)
		let resp = await axios.post('http://192.168.88.21:3000/api/redeem', {
			certificate: localStorage.getItem('certificate'),
			privateKey: localStorage.getItem('privateKey'),
			...paper
		})
		allPapers()
		loader(false)
		setInfo([`Paper with number ${resp.data.paperNumber} has been successfully redeemed`, true])
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
									<TableRow 
										className={row.Record.currentState ===  4 ? classes.redeemedPaper: ''}
										hover={row.Record.currentState !==  4}
										role="checkbox" 
										tabIndex={-1} 
										key={row.Key}>
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
											{ user.company === 'org2' ?
												<Button 
													onClick={() => viewPaperHistory(row.Record.paperNumber)} 
													variant="outlined" 
													>
													History
												</Button> :
												row.Record.currentState ===  1? 
												<Button 
													variant="outlined" 
													color="primary"
													className={classes.button}
													onClick={() => buyPaper(row.Record)}
													>
													Buy
												</Button> : 
												new Date(row.Record.maturityDateTime) > new Date() ?
												row.Record.currentState !==  4 ?
													<Button 
														variant="outlined" 
														color="secondary"
														onClick={() => redeemPaper(row.Record)}
														>
														Redeem
													</Button>:
													<>Redeemed</>
												:
												<>The paper is awaiting maturity</>
												
											}
										</TableCell>

									</TableRow>
								);
								})}
								{user.company === 'org2' ? 
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
						{user.company === 'org2' ? 
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
			<Snackbar 
                open={info[1]} 
                autoHideDuration={3000} 
                onClose={() => setInfo(['', false])}
                >
                <Alert 
                onClose={() => setInfo(['', false])}
                severity='info'
                >
                    {info[0]}
                </Alert>
            </Snackbar>
		</Container>
	)
}

export default PaperList