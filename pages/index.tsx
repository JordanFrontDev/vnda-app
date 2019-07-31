import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserList from '../components/UserList';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blueGrey';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/UserContext';
   
const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: '#fff',
    marginTop: '1rem',
    fontWeight: 'bold'
},
titles: {
    display: 'grid',
    gridTemplateColumns: '11% 33% 36% 30%',
},
title: {
    '& span': {
        fontWeight: 'bold',
        fontSize: '1.1rem'
    }
},
delete: {
    fontWeight: 'bold',
    marginLeft: '1.5rem'
},
button: {
    backgroundColor: '#fff',
    border: `solid 1px ${blue[200]}`,
    color: blue[900],
    marginRight: '1.5rem'
},
buttonBox: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
        color: blue[600]
    }
},
spinner: {
    margin: '3rem 0',
    width: '100%',
    textAlign: 'center'

}
});

interface Props extends WithStyles<typeof styles> {}

const Home: React.FC<Props> = ({classes}) => {
  const { isLoading } = useContext(UserContext);
    return (
        <React.Fragment>
            <div className={classes.buttonBox}>
                <Typography variant='h4'>Usuários</Typography>
                <Link href={`/adduser`} >
                    <Button className={classes.button}>Novo Usuário</Button>
                </Link>

            </div>
            <List className={classes.root}>
                <ListItem className={classes.titles}>
                    <h1></h1>
                    <ListItemText primary='E-mail' className={classes.title}></ListItemText>
                    <ListItemText primary='Nome' className={classes.title}></ListItemText>
                    <ListItemText primary='Código Externo' className={classes.title}></ListItemText>
                </ListItem>
                <Divider />
                {isLoading 
                    ? <div className={classes.spinner}><CircularProgress /></div>
                    : <UserList />
                }
            </List>
        </React.Fragment>
    );
}


export default withStyles(styles)(Home);