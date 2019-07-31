import { createStyles, makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blueGrey';

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& label': {
                marginTop: '1.2rem',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: blue[800]
            }
        },
        button: {
            alignSelf: 'flex-start',
            backgroundColor: blue[700],
            color: blue[100],
            marginTop: '1.5rem',
            '&:hover': {
                backgroundColor: blue[500],
            }
        },
        titleBox: {
            display: 'flex',
            margin: '.5rem 0'
        },
        separation: {
            margin: '0 .5rem',
            fontWeight: 'bold',
            color: blue[400]
        },
        usersTitle: {
            color: blue[400],
            fontWeight: 300,
            cursor: 'pointer',
            '&:hover': {
                color: blue[600]
            }
        },
        email: {
            color: blue[700]
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            '& label': {
                marginTop: '1.2rem',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: blue[800]
            }
        },
        SelectInput: {
            backgroundColor: '#fff',
            border: 'solid 1px lightgrey',
            height: '2.7rem'
        },
        input: {
            borderRadius: 4,
            backgroundColor: '#fff',
            border: `1px solid ${blue[200]}`,
            padding: '5px 12px',
            color: blue[900],
            '&:hover': {
                borderColor: blue[600]
            }
        }
    })
);


