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
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from "react-router-dom"
import makeTheme from '../classes' 
import getCSR from '../csr'

import axiosInstance from '../../axiosInstance'
import './registrationForm.css'


const RegistrationForm =  ({changeAuth, loader, setUser}) => {
    const classes = makeTheme()
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [openInfo, setOpenInfo] = useState(false)
    const [infoMsg, setInfoMsg] = useState('')
    const history = useHistory()
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    const handleName = e => {
        setName(e.target.value)
    }

    const handleCompany = e => {
        setCompany(e.target.value)
    }
    const signUp = async (e) => {
        if(name === '' || !re.test(name)){
            setInfoMsg('You must enter a name, it must be like name@domen.com')
            setName('')
            setOpenInfo(true)
            return
        }
        if(company === ''){
            setInfoMsg('You must choose a company')
            setOpenInfo(true)
            return
        }
        loader(true)
        const {privateHex} = getCSR({name, company})
        let resp = await axiosInstance.post(
            '/api/registeruser', 
            {'name': name, 'company': company}
        )
        if(resp.data.error){
            setInfoMsg('This name is already in use')
            setOpenInfo(true)
        }
        else{
            let data = resp.data
            download(JSON.stringify(data.certificate).replace(/\\n/g, '\n').replace(/"/g, ''), name + '.pem' )
            localStorage.setItem('certificate', data.certificate)
            localStorage.setItem('privateKey', data.privateKey)
            localStorage.setItem('user', JSON.stringify({
                name, company
            }))
            download(JSON.stringify(data.privateKey).replace(/\\r\\n/g, '\n').replace(/"/g, ''), privateHex + '_pk.pem' )
            setUser({
                name, company
            })
            history.push('/papers')
            // auth({
            //     name: name,
            //     company: company
            // })
        }
        loader(false)
    }
    
    const handleClose = (event) => {
        setOpenInfo(false);
    };

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
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Your name"
                    onChange={handleName}
                />
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
                        <MenuItem value="org1">Digibank</MenuItem>
                        <MenuItem value="org2">Magnetocorp</MenuItem>
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
            <Snackbar 
                open={openInfo} 
                autoHideDuration={3000} 
                onClose={handleClose}
                >
                <Alert 
                onClose={handleClose}
                severity='error'
                >
                    {infoMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default RegistrationForm
