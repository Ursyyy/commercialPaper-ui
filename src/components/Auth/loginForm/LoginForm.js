import React, {useState, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { DropzoneArea } from 'material-ui-dropzone'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from "react-router-dom"
import axiosInstance from '../../axiosInstance'

import makeTheme from '../classes'

/**
 * @param {string} certText 
 * @returns {boolean}
 */
const isCertificate = certText => {
    return certText.startsWith('-----BEGIN CERTIFICATE-----') && certText.match(/-----END CERTIFICATE-----\s*$/)
}

/**
 * @param {string} prKeyText 
 * @returns {boolean}
 */
const isPrivateKey = prKeyText => {
    return prKeyText.startsWith('-----BEGIN PRIVATE KEY-----') && prKeyText.match(/-----END PRIVATE KEY-----\s*$/)
}

const LoginForm = ({changeAuth, loader, setUser}) => {
    const classes = makeTheme()
    const [certFile, setCertFile] = useState(null)
    const [keyFile, setKeyFile] = useState(null)
    const [openInfo, setOpenInfo] = useState(['success', false])
    const [infoMsg, setInfoMsg] = useState('')
    const history = useHistory()
    const [countFiles, setCount] = useState(0)
    const signUp = (e) => {
        changeAuth()
    }

    const handleClose = (event) => {
        setOpenInfo(false);
    };

    useEffect( () => {
		localStorage.clear()
	}, [])

    const signIn = async () => {
        
        if(certFile === null || keyFile === null){
            setInfoMsg('Please, choose a files')
            setOpenInfo(['error', true])
            return
        }
        // 192.168.88.21
        loader(true)
        const certificate = localStorage.getItem('certificate')
        const privateKey = localStorage.getItem('privateKey')
        const resp = await axiosInstance.post('/api/login', {
            certificate,
            privateKey,
            flag:'login'
        })
        localStorage.setItem('user', JSON.stringify(resp.data))
        setUser(resp.data)
        history.push('/papers')
        loader(false)   
    }
    /**
     * @param {array} files
     * @returns {void}
     */
    const fileUpload = files => {
        if( files.length < countFiles) return
        files.map(item => {
            if(item == undefined) return
            let info = 'success'
            let reader = new FileReader()
            reader.readAsText(item);
            reader.onload = function(){
                let result = reader.result
                if(isCertificate(result)){
                    setCertFile(item.name)
                    setInfoMsg('Certificate uploaded')
                    localStorage.setItem('certificate', result)
                } else if(isPrivateKey(result)){
                    setKeyFile(item.name)
                    setInfoMsg('Private key uploaded')
                    localStorage.setItem('privateKey', result)
                } else{
                    info = 'error'
                    setInfoMsg('Wrong file')
                }
                setOpenInfo([info, true])
                setCount(files.length)
            }
  
            
        })        
    }

    const onDelete = file => {
        let reader = new FileReader()
        // console.log(file)
        reader.readAsText(file);
        reader.onload = function(){
            let result = reader.result
            if(isCertificate(result)){
                setCertFile()
                setInfoMsg('Certificate was deleted!')
                localStorage.removeItem('certificate')
            } else if(isPrivateKey(result)){
                setKeyFile()
                setInfoMsg('Private key was deleted!')
                localStorage.removeItem('privateKey')
            } else{
                setInfoMsg('Wrong file was deleted')
            }
            setOpenInfo(['info', true])
            let count = countFiles
            setCount(count--)
        }
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
                <DropzoneArea
                    acceptedFiles={['application/*']}
                    dropzoneClass={classes.dragNdrop}
                    onChange={fileUpload}
                    onDelete={onDelete}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                    previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                    previewChipProps={{classes: { root: classes.dragNdropPreview } }}
                    previewText="Selected files"
                    dropzoneText="Drop files here"
                    showAlerts={false}
                    filesLimit={2}
                />
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
            <Snackbar open={openInfo[1]} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={openInfo[0]}>
                    {infoMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default LoginForm