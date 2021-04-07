import React, {useState} from 'react'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

import makeTheme from '../classes'

// import axios from 'axios'

import './registrationForm.css'
import axios from 'axios';


const RegistrationForm = ({changeAuth, auth}) => {
    const classes = makeTheme()
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [errorName, setErrorName] = useState(false)
    const [errorUniqueName, setErrorUniqueName] = useState(false)
    const [errorCompany, setErrorCompany] = useState(false)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const handleName = e => {
        setErrorName(false)
        setErrorUniqueName(false)
        setName(e.target.value)
    }

    const handleCompany = e => {
        setErrorCompany(false)
        setCompany(e.target.value)
    }
    const signUp = (e) => {
        if(name === ''){
            setErrorName(true)
            return
        }
        if(company === ''){
            setErrorCompany(true)
            return
        }
        if(!re.test(name)){
            setErrorName(true)
            return
        }
        if(errorName || errorCompany || errorUniqueName){
            return
        }
        axios.post('http://192.168.88.21:3000/api/registeruser', 
            {'name': name, 'company': company},
                {headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json; charset=utf-8',
                    "Access-Control-Allow-Origin": "*"
                }})
            .then( resp => {
                if(resp.data.error){
                    setErrorUniqueName(true)
                }
                else{
                    let data = resp.data
                    console.log(data)
                    download(JSON.stringify(data.certificate), name + '.pem' )
                    download(JSON.stringify(data.privateKey), name + '.id' )
                    sessionStorage.setItem('certificate', data.certificate)
                    sessionStorage.setItem('privateKey', data.privateKey)
                    // auth({
                    //     name: name,
                    //     company: company
                    // })
                }
            })
            .catch( error => console.log(error))        
    }

    const download = (text, filename) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

    const signIn = () => changeAuth()

    return (
        <Container component="main" maxWidth="xs">
            <div className="box">
                <Typography component="h1" variant="h5" className={classes.header}>
                    Sign up
                </Typography>
                <p className={errorName ? "error sign reg" : "error"}>You must enter a name, it must be like name@domen.com</p>
                <p className={errorUniqueName ? "error sign reg" : "error"}>This name is already in use</p>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Your name"
                    onChange={handleName}
                />
                <p className={errorCompany ? "error sign reg" : "error"}>You must choose a company</p>
                <FormControl 
                    className={classes.textField}
                    margin="normal"
                    variant="outlined" 
                    fullWidth
                    >
                    <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={handleCompany}
                        label="Company"
                        >
                        <MenuItem value="digibank">Digibank</MenuItem>
                        <MenuItem value="magnetocorp">Magnetocorp</MenuItem>
                    </Select>
                    
                </FormControl>
                <Button 
                    className={classes.button}
                    variant="contained"
                    onClick={signUp}
                    fullWidth
                    >
                    Sign up
                </Button>
                <Grid 
                    container
                    className={classes.gridForLink}
                    justify="flex-end"
                    >
                    <Link 
                        href="#" 
                        className={classes.link}
                        onClick={signIn}
                        >
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </div>

        </Container>
    )
}

export default RegistrationForm
