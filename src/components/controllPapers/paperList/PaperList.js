import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import Grid from '@material-ui/core/Grid';
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
    flexGrow: 1,
  },
  paper: {
    height: 'auto',
    minHeight: 165,
    width: 220,
    maxWidth: 220,
    padding: 5
  },
  control: {
    padding: theme.spacing(2),
  },
  container:{
      padding: 15,
      margin: 'auto'
  },
  button:{
      color: "#00add8a0",
    //   marginLeft: '70%'
  },
  paperDiv:{
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const PaperList = ({user}) => {
    let arr = [
        {
            item: '00002',
            price: '12345',
            owner: 'Magnetocorp',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
        {
            item: '00003',
            price: '1222',
            owner: 'Palm',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
        {
            item: '00004',
            price: '53332',
            owner: 'Magnetocorp',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
        {
            item: '00005',
            price: '50000',
            owner: 'Magnetocorp',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
        {
            item: '00006',
            price: '500',
            owner: 'Nick',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
        {
            item: '00007',
            price: '4000',
            owner: 'Magnetocorp',
            createDate: '2020-05-31',
            redeemDate: '2020-11-30'
        },
    ]
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState(arr)
    const [paperHistory, setPaperHistory] = useState('')    
    const [openHistory, setOpenHistory] = useState(false)

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenHistory(false)
        setOpen(false);
    };
    
    
    // const buyPaper = item => {
    //     for(let i = 0; i < arr.length; ++i){
    //         if(arr[i].item === item){
    //             arr[i].owner="Digibank"
    //             break
    //         }
    //     }
    //     setData(arr)
    //     console.log(data)
    // }

    const viewPaperHistory = paper => {
        axios.post('http://192.168.88.21:3001/api/history', {
            name: user.name,
            company: user.company,
            paper: '00001',
            x509Identity: ""
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
            setPaperHistory(['Paper #' + paper,resultHistory])
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
            {/* <Typography className="caption" variant="h2" component="h2">
                <div>Papers list</div>
            </Typography> */}
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                    {data.map((value) => (
                        <Grid key={value.item} item>
                            <Paper className={classes.paper}>
                                <p>Paper #{value.item}</p>
                                <p>Price: {value.price}</p>
                                <p>Owner: {value.owner}</p>
                                <p>Create date: {value.createDate}</p>
                                <p>Redeem date: {value.redeemDate}</p>
                                { user.company === "magnetocorp"? 
                                <div className={classes.paperDiv}>
                                    <Button 
                                            // onClick={() => buyPaper(value.item)} 
                                            variant="outlined" 
                                            onClick={viewPaperHistory}
                                            >
                                            History
                                        </Button>
                                </div> :

                                <div className={classes.paperDiv}>
                                    { value.owner === 'Magnetocorp' ?
                                        <Button 
                                            variant="outlined" 
                                            color="primary"
                                            className={classes.button}
                                            onClick={handleClick}
                                            // classes={{focus:classes.button}}
                                            >
                                            Buy
                                        </Button> : value.owner !== user.name ?
                                            <p>Bought by {value.owner}</p> : 
                                            <Button 
                                            onClick={handleClick}
                                            variant="outlined" 
                                            color="secondary"
                                            // className={classes.button}
                                            >
                                                Redeem
                                            </Button>}
                                </div>}
                            </Paper>
                        </Grid>
                    ))}
                        {user.company === 'magnetocorp' &&
                            <Grid item>
                            <Paper className={classes.paper}>
                                <AddPaperBlock/>
                            </Paper>
                        </Grid> }
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    Will be added in version 1.1
                </Alert>
            </Snackbar>
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