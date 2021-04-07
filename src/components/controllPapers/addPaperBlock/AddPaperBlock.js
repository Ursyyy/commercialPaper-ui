import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles'

import '../controllPapers.css'

const useStyles = makeStyles((theme) => ({ 
    container:{
        paddingRight: 20,
        paddingLeft: 20,
        // margin: ,
        // display: 'inline-grid'
    },
    header:{
        fontSize: '1.1em',
        color: "#474747",
        marginTop: 6,
        marginBottom: 9,
        marginLeft: '17%',
        marginRight: '17%'
    },
    addButton: {
        marginLeft: "75%"
    },
    datePicker:{
        height: 30,
        marginTop: 8,
        marginBottom: 23,
        "&.MuiInput-formControl" :{
            marginTop: 12
        }
    }
 }));

const AddPaperBlock = ({addPaper}) => {
    const classes = useStyles()
    // const datePicker = React.forwardRef()
    const [date, setSelectedDate] = useState(new Date())
    const [errorDate, setErrorDate] = useState(false)
    const [price, setPrice] = useState(0)
    const [errorPrice, setErrorPrice] = useState(false)

    const handleDateChange = (newDate) => {
        setErrorDate(false)
        if(newDate < new Date()){
            setErrorDate(true)
            return
        }
        setSelectedDate(newDate)
    }

    const handlerPrice = (e) => {
        setErrorPrice(false)
        setPrice(e.target.value)
    }

    const btnClick = () => {
        if(isNaN(price)){
            setErrorPrice(true)
            return
        }
        // addPaper({
        //     price, date
        // })
    }

    return (
        <div className={classes.container}>
            <div>
                <h6 className={classes.header}>Add new paper</h6>
            </div>
            <p className={errorPrice ? "error show": 'error'}>Incorrect number</p>
            <TextField
                id="standard-textarea"
                // label="Price"
                onChange={handlerPrice}
                placeholder="Price"
                type="number"
                multiline
                />
            <p className={errorDate ? "error show": 'error'}>Choose a date greater than today</p>
            <MuiPickersUtilsProvider className={classes.muiPicker} utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
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
            <Button 
                variant="outlined"
                className={classes.addButton}
                onClick={btnClick}
                >
                    Add
            </Button>
        </div>
    )
}

export default AddPaperBlock