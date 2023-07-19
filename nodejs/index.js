import express from "express";
import { createClient } from 'redis';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const PORT = 6380;

app.get('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: "127.0.0.1", port: PORT });

    redis.on('error', err => console.log('Error connecting to Redis: ', err));

    await redis.hgetall(req.params.key).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

app.post('/hash', async (req, res) => {
    const redis = new Redis({ host: "127.0.0.1", port: PORT });

    redis.on('error', err => console.log('Error connecting to Redis: ', err));

    await redis.hset(req.body.key, req.body.fields).then(result => {
        res.send('criado');
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

app.put('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: "127.0.0.1", port: PORT });

    redis.on('error', err => console.log('Error connecting to Redis: ', err));


    await redis.hset(req.params.key, req.body).then(result => {
        res.send('atualizado');
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

app.delete('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: "127.0.0.1", port: PORT });

    redis.on('error', err => console.log('Error connecting to Redis: ', err));

    await redis.del(req.params.key).then(result => {
        res.send('deletado');
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

app.listen(4001);
