import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Link from 'next/link';
import { fade } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        overflowX: 'hidden',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: blue[800]
      },
      toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: blue[50],
        position: 'absolute'
    
      },
      menuBox: {
        display: 'flex',
        alignItems: 'center',
        width: '10rem',
        '& svg': {
          fill: blue[100],
        }
      },
  
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
    
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '70%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          fill: blue[800]
        }
      },
      inputRoot: {
        color: 'inherit',
    
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 120,
        },
      },
      logo: {
        justifySelf: 'center',
        color: blue[100],
      },
      avatarBox: {
        display: 'flex'
      },
      select: {
        marginLeft: '1rem',
        color: blue[100],
        '&:before': {
          display: 'none'
        },
        '& svg': {
          fill: blue[100]
        }
      },
    
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: grey[100],
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      },
      
      toolbar: theme.mixins.toolbar,
  });


interface Props extends WithStyles<typeof styles> {}

const NavBar: React.FC<Props> = ({children, classes}) => {
  const [user, setUser] = useState('reis');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser(e.target.value);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.menuBox}>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
          </div>
          <Link href='/'>
            <Typography variant="h4" noWrap className={classes.logo}>
              Vnda
            </Typography>
          </Link>
          <div className={classes.avatarBox}>
            <Avatar alt="Remy Sharp" src="/static/pp.jpg" />
            <Select
              className={classes.select}
              value={user}
              onChange={handleChange}
            >
              <MenuItem value={'reis'}>reis@vnda.com.br</MenuItem>
            </Select>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          ///////// CONTENT //////////
        }
          {children}
        {
          ///////// CONTENT //////////
        }
      </main>
    </div>
  );
}

export default withStyles(styles)(NavBar);
