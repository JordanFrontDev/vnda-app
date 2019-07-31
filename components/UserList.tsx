import React, {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import Divider from '@material-ui/core/Divider';
import blue from '@material-ui/core/colors/blueGrey';
import {createStyles, withStyles, WithStyles} from '@material-ui/styles'; 
import { UserContext } from '../contexts/UserContext';

const styles = () => createStyles({
    list: {
        display: 'grid',
        gridTemplateColumns: '11% 33% 36% 30%'
    
    },
    email: {
        color: blue[700]
    },
    delete: {
        '& span': {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginLeft: '2rem'
        }
    }
});

interface Props extends WithStyles<typeof styles>{}

const UserList: React.FC<Props> = ({classes}) => {
    const { users, onDeleteUser } = useContext(UserContext);
    return (
        <div>
        {users.map(user => (
            <React.Fragment key={user.id}>
                <ListItem button key={user.id} className={classes.list}>
                    <ListItemText className={classes.delete} onClick={() => onDeleteUser(user.id)}>x</ListItemText>
                        <Link href={`/edituser?id=${user.id}`} as={`/edituser/${user.id}`}>
                            <ListItemText primary={user.email} className={classes.email}></ListItemText>
                        </Link>
                    <ListItemText primary={user.name}></ListItemText>
                    <ListItemText primary={user.external_code}></ListItemText>
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
        </div>
    );
}

export default withStyles(styles)(UserList);