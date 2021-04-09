import { makeStyles } from '@material-ui/core/styles';

const makeTheme = makeStyles( theme => ({

    button:{
        marginTop: theme.spacing(2),
        backgroundColor: "#00add8",
        color: "#fff",
        
    },
    buttonLabel:{
        color: "#e0e0e0"
    },
    textField: {
        '& label.Mui-focused': {
        	color: "#00add8a0",
        },
        '& .MuiInput-underline:after': {
        	borderBottomColor: "#00add8a0",
        },
        '& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: "#00add8a0",
			},
			'&:hover fieldset': {
				borderColor: "#00add8a0",
			},
			'&.Mui-focused fieldset': {
				borderColor: "#00add8a0",
			},
        },
    },
    header:{
        fontSize: 25,
        textAlign: 'center'
    },
    gridForLink:{
        marginTop: 20,
        marginRight: 5,
        textAlign: 'end',
    },
    link:{
        color: "#00add8a0",
    },
    error:{
        fontSize: '0.75em',
        color: "#D8000C",
        transition: [2, 'opasicy', '2s', '3s', 'easy-in']
    },
    uploadFileButton:{
      marginBottom: 10,
    },
    dragNdrop:{
      minHeight: 170
    },
    dragNdropPreview: {
      minWidth: 120,
      maxWidth: 220
    },

}))

export default makeTheme;