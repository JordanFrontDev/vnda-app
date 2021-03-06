import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../components/NavBar';
import { UserProvider } from '../contexts/UserContext';

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <title>My page</title>
                </Head>

                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <UserProvider>
                    <NavBar>
                        <Component {...pageProps} />
                    </NavBar>
                </UserProvider>
            </Container>
        );
    }
}

export default MyApp;
