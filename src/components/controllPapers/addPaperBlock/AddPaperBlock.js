import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles'

import '../controllPapers.css'

const useStyles = makeStyles((theme) => ({ 
    container:{
        paddingRight: 20,
        paddingLeft: 20,
        display: 'flex',
        marginTop: 20
    },
    dialog:{
        display: 'grid',
        padding: '0px 24px 8px',
        marginTop: -10
    },
    header:{
        fontSize: '1.1em',
        color: "#474747",
        marginTop: 6,
        marginBottom: 9,
        marginLeft: '17%',
        marginRight: '17%'
    },
    button: {
        color: "#00add8a0"
    },
    textField: {
        '& label.Mui-focused': {
        	color: "#00add8a0",
        },
        '& .MuiInput-underline:after': {
        	borderBottomColor: "#00add8",
        },
        '& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: "#00add8",
			},
			'&:hover fieldset': {
				borderColor: "#00add8",
			},
			'&.Mui-focused fieldset': {
				borderColor: "#00add8",
			},
        },
    },
 }));



const AddPaperBlock = ({addPaper}) => {
    const classes = useStyles()
    const [date, setSelectedDate] = useState(new Date())
    const [error, setError] = useState(false)
    const [price, setPrice] = useState(0)
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (newDate) => {
        setError(false)
        if(newDate < new Date()){
            setError(true)
            return
        }
        let d = newDate
        setSelectedDate(newDate)
        let pad = s => { return (s < 10) ? '0' + s : s; }
        console.log([pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('.'))
    }

    const handlerPrice = (e) => {
        setError(false)
        setPrice(e.target.value)
    }

    const btnClick = () => {
        if(isNaN(price)){
            setError(true)
            return
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Issue a new paper</DialogTitle>
            <DialogContent 
                className={classes.dialog}
                >
                <TextField
                    className={classes.textField}
                    id="standard-textarea"
                    label="Price"
                    onChange={handlerPrice}
                    placeholder="5000"
                    type="number"
                    multiline
                    />
                <MuiPickersUtilsProvider className={classes.muiPicker} utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.textField}
                        disableToolbar
                        variant="inline"
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        // ref={datePicker}
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button 
                    className={classes.button}
                    onClick={handleClose}
                    >
                    Issue
                </Button>
                <Button 
                    className={classes.button}
                    onClick={handleClose}
                    >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPaperBlock