import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import { useStyles } from '../styles/FormStyles';
import InputBase from '@material-ui/core/InputBase';
import { NextPage } from 'next';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { User } from '../interfaces';
import { NextPageContext } from 'next';
import { UserContext } from '../contexts/UserContext';

interface Props {
    user: User
}

const EditUser: NextPage<Props> = ({ user }) => {
    const classes = useStyles({});
    
    const { getUsers } = useContext(UserContext)
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [role, setRole] = useState(user.role);
    const [externalCode, setExternalCode] = useState(user.external_code);
    const [tags, setTags] = useState(user.tags);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }

    const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRole(e.target.value);
    }

    const onExternalCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setExternalCode(e.target.value);
    }

    const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const tags = e.target.value.split(',')
        setTags(tags);
    }

    const onUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/users/${user.id}`, {
                email: email,
                name: name,
                role: role,
                external_code: externalCode,
                tags: tags
            })
            getUsers();
            Router.push('/');
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div >
            <div className={classes.titleBox}>
                <Link href='/'>
                    <Typography variant='h4' className={classes.usersTitle}>Usuários</Typography>
                </Link>
                <Typography variant='h4' className={classes.separation}>/</Typography>
                <Typography variant='h4' className={classes.email}>{user.email}</Typography>
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



EditUser.getInitialProps = async ({ query }: NextPageContext) => {
    const fetchUser = await axios.get(`http://localhost:3000/users/${query.id}`);
    const user: User = fetchUser.data;
    return { user }
}

export default EditUser;