const express = require('express')
const next = require('next')
const axios = require('axios');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const token = require('./token');
axios.defaults.headers.common['Authorization'] = `Token token="${token}"`;


app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json());

        server.get('/users', async (req, res) => {
            try {
                const responseData = await axios.get('https://demo.vnda.com.br/api/v2/users');
                const users = responseData.data;

                res.status(responseData.status);
                res.json(users);
            } catch (e) {
                res.status(400).send(e);
            }

        })

        server.get('/users/:id', async(req, res) => {
            try {
                const responseData = await axios.get(`https://demo.vnda.com.br/api/v2/users/${req.params.id}`);
                const user = responseData.data;

                res.status(responseData.status);
                res.json(user);
            }catch(e) {
                res.status(400).send(e);
            }
        })

        server.patch('/users/:id', async(req, res) => {
            const userData = req.body;
            const id = req.params.id;
            try {
                const responseData = await axios.patch(`https://demo.vnda.com.br/api/v2/users/${id}`, userData);
                res.status(responseData.status);
                res.json(responseData.data);
            }catch(e) {
                res.status(400).send(e);
            }
        })

        server.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            try {
                const responseData = await axios.delete(`https://demo.vnda.com.br/api/v2/users/${id}`);
                res.status(responseData.status);
            }catch(e) {
                res.status(400).send(e);
            }
        })

        server.get('/edituser/:id', (req, res) => {
            app.render(req, res,'/edituser', {id: req.params.id});
          })

        server.post('/users', async (req, res) => {
            const userData = req.body;
            try {
                const responseData = await axios.post('https://demo.vnda.com.br/api/v2/users', userData);
                res.status(responseData.status);
                res.send(responseData.data);
            } catch (e) {
                res.status(400).send(e);
            }
        })

       

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })