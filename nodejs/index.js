import express from "express";
const router = express.Router();

const app = express();

app.use(express.json());

import { createClient } from 'redis';

var endpoints = [
    { host: '172.21.0.5', port: 26379 },
    { host: '172.21.0.6', port: 26380 },
    { host: '172.21.0.7', port: 26381 }
];

app.post('/hash', async (req, res) => {
    const client = createClient(endpoints);
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    await client.HSET(req.body.key, Object.entries(req.body.fields)).then(result => {
        res.send('criado');
    }).catch(err => {
        res.status(500).send(err.message);
    }).finally(async () => await client.disconnect());
});

app.get('/hash/:key', async (req, res) => {
    const client = createClient(endpoints);
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    await client.HGETALL(req.params.key).then(result => {
        res.send(Object.keys(result).length > 0 ? result : 'não encontrado');
    }).catch(err => {
        res.status(500).send(err.message);
    }).finally(async () => await client.disconnect());
});

app.put('/hash/:key', async (req, res) => {
    const client = createClient(endpoints);
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    await client.HSET(req.params.key, Object.entries(req.body)).then(result => {
        res.send('atualizado');
    }).catch(err => {
        res.status(500).send(err.message);
    }).finally(async () => await client.disconnect());
});

app.delete('/hash/:key', async (req, res) => {
    const client = createClient(endpoints);
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    await client.DEL(req.params.key).then(result => {
        res.send('deletado');
    }).catch(err => {
        res.status(500).send(err.message);
    }).finally(async () => await client.disconnect());
});

app.listen(4000);
