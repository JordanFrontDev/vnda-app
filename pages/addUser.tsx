import React, {useState, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import { useStyles } from '../styles/FormStyles';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Link from 'next/link';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';


const AddUser: React.FC = () => {
    const classes = useStyles({});
    const { getUsers } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [externalCode, setExternalCode] = useState('');
    const [tags, setTags] = useState([]);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    }

    const onExternalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExternalCode(e.target.value);
    }

    const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(',')
        setTags(tags);
    }

    const onUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3000/users', {
            email: email,
            name: name,
            role: role,
            external_code: externalCode,
            tags: tags
          }) .then((response) => {
            console.log(response);
          })
          setEmail('');
          setName('');
          setExternalCode('');
          setTags([]);
          setRole(null);
          
          getUsers();
    }


    return (
        <div className={classes.root}>
            <div className={classes.titleBox}>
                <Link href='/'>
                    <Typography variant='h4' className={classes.usersTitle}>Usuários</Typography>
                </Link>
            </div>

            <form onSubmit={onUserSubmit} className={classes.form}>
                <InputLabel shrink htmlFor="email-input">
                    E-mail
                </InputLabel>
                <InputBase
                    id="email-input"
                    value={email}
                    className={classes.input}
                    onChange={onEmailChange}
                    required
                />

                <InputLabel shrink htmlFor="name-input">
                    Name
                </InputLabel>
                <InputBase
                    id="name-input"
                    value={name}
                    className={classes.input}
                    onChange={onNameChange}
                    required
                />

                <InputLabel shrink htmlFor="role">
                    Função
                </InputLabel>
                <Select
                    value={role}
                    onChange={onRoleChange}
                    input={<FilledInput name="role" id="role" />}
                    className={classes.SelectInput}
                    required
                >
                    <MenuItem value={0}>Gestor</MenuItem>
                    <MenuItem value={1}>Agente</MenuItem>
                    <MenuItem value={2}>Local</MenuItem>
                </Select>

                <InputLabel shrink htmlFor="external-code-input">
                    Código Externo
                </InputLabel>
                <InputBase
                    id="external-code-input"
                    value={externalCode}
                    className={classes.input}
                    onChange={onExternalCodeChange}
                    required
                />

                <InputLabel shrink htmlFor="tags-input">
                    Tags
                </InputLabel>
                <InputBase
                    id="tags-input"
                    value={tags}
                    className={classes.input}
                    onChange={onTagsChange}
                    required
                />

                <Button type='submit' variant='outlined' className={classes.button}>Salvar</Button>
            </form>
    </div>
    )
}

export default AddUser;