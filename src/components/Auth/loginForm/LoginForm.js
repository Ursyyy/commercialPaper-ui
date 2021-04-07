import React, {useState} from 'react'

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import makeTheme from '../classes'
import axios from 'axios';

const LoginForm = ({changeAuth, auth}) => {
    const classes = makeTheme()
    const [certFile, setCertFile] = useState(null)
    const [keyFile, setKeyFile] = useState(null)
    const [error, setError] = useState(['', false])
    // const [user, setUser] = useState(null)
    const signUp = (e) => {
        changeAuth()
    }

    const signIn = () => {
        
        if(certFile === null || keyFile === null){
            setError(['Please, choose a files', true])
            return
        }
        setError(['', false])
        let certificate = localStorage.getItem('certificate').replace(/\\n/g, '\n'),
            privateKey = localStorage.getItem('privateKey').replace(/\\r\\n/g, '\n')
        //192.168.88.21
        axios.post('http://192.168.88.21:3000/api/login', {
            'certificate': certificate,
            'privateKey': privateKey
        })
        .then(resp => console.log(resp))
        .catch( err => console.log(err))
    
        // axios.post('http://192.168.88.21:3002/api/issue', {
        //     "certificate": certificate,
        //     "privateKey": privateKey,
        //     "paperNumber":"00012", 
        //     "releaseDate":"2021-01-31", 
        //     "redeemDate":"2021-11-30", 
        //     "cost":"500" 
        // })
        // .then(resp => console.log(resp))
    }

    const fileUpload = (e,filename) => {
        let file = e.target.files[0]
        setError(['', false])
        let reader = new FileReader()
        reader.readAsText(file);
        reader.onload = function() {
            try{
                let result = reader.result
                if(filename === 'key'){ 
                    setKeyFile(file.name)
                    localStorage.setItem('privateKey', result)
                    
                }else{ 
                    setCertFile(file.name)
                    localStorage.setItem('certificate', result)
                }
            }catch{
                setError(['Incorrect files, please, choose again', true])
            }
            
          };
        
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className="box">
                <Typography 
                    component="h1"
                    className={classes.header}
                    >
                    Sign in
                </Typography>
                <p>Please select the file that you issued after registration</p>
                <p className={error[1] ? "error sign" : 'error'}>{error[0]}</p>
                <div className="fileBlock">
                    <Button
                        className={classes.uploadFileButton}
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload pem file
                        <input
                            type="file"
                            assept=".pem"
                            hidden
                            onChange={e => fileUpload(e, 'pem')}
                        />
                    </Button>
                    { certFile && <p className="fileName">{certFile}</p>}
                </div>
                <div className="fileBlock">
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload id file
                        <input
                            type="file"
                            assept=".pem"
                            hidden
                            onChange={e => fileUpload(e, 'key')}
                        />
                    </Button>
                    { keyFile && <p className="fileName">{keyFile}</p>}
                </div>
                <Button 
                    variant="contained"
                    className={classes.button}
                    onClick={signIn}                    
                    fullWidth
                    >
                    Sign in</Button>
                <Grid 
                    container
                    className={classes.gridForLink}
                    justify="flex-end"
                    >
                    <Link 
                    href="#"
                    className={classes.link}
                    onClick={signUp}>
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </div>

        </Container>
    )
}

export default LoginForm