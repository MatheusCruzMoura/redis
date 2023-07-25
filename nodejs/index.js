import express from "express";
import { createClient } from 'redis';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

app.get('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: '172.20.0.5', port: 26379 });
    redis.on('error', err => console.log('Error connecting to Redis:', err.message));

    await redis.info().then(async (result) => {
        let host = result.split('\n').slice(-2, -1)[0].slice(40, 55).split(':');
        const client = new Redis({ host: host[0], port: host[1] });

        client.on('error', err => {
            console.log('Error connecting to Redis:', err.message)
        });

        await client.hgetall(req.params.key).then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }).catch(err => {
        console.log(err.message);
    });
});

app.get('/keys', async (req, res) => {
    const redis = new Redis({ host: '172.20.0.5', port: 26379 });
    redis.on('error', err => console.log('Error connecting to Redis:', err.message));

    var teste = []
    await redis.info().then(async (result) => {
        teste = result.split('\n').slice(-2, -1)[0].slice(40, 55).split(':');
        const client = createClient({ url: `redis://${teste[0] == '172.20.0.2' ? (teste[0] == '172.20.0.3' ? '172.20.0.4' : '172.20.0.3') : '172.20.0.2'}`, port: teste[1] });

        client.on('error', err => console.log('Error connecting to Redis: ', err));
        client.connect();

        await client.keys('*').then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send(err.message);
        }).finally(() => client.disconnect());
    }).catch(err => {
        console.log(err.message);
    });
});

app.post('/hash', async (req, res) => {
    const redis = new Redis({ host: '172.20.0.5', port: 26379 });
    redis.on('error', err => console.log('Error connecting to Redis:', err.message));

    var teste = []
    await redis.info().then(async (result) => {
        teste = result.split('\n').slice(-2, -1)[0].slice(40, 55).split(':');
        const client = new Redis({ host: teste[0], port: teste[1] });

        client.on('error', err => console.log('Error connecting to Redis: ', err));

        await client.hset(req.body.key, req.body.fields).then(result => {
            res.send('criado');
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }).catch(err => {
        console.log(err.message);
    });
});

app.put('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: '172.20.0.5', port: 26379 });
    redis.on('error', err => console.log('Error connecting to Redis:', err.message));

    var teste = []
    await redis.info().then(async (result) => {
        teste = result.split('\n').slice(-2, -1)[0].slice(40, 55).split(':');
        const client = new Redis({ host: teste[0], port: teste[1] });

        client.on('error', err => console.log('Error connecting to Redis: ', err));

        await client.hset(req.params.key, req.body).then(result => {
            res.send(teste);
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }).catch(err => {
        console.log(err.message);
    });
});

app.delete('/hash/:key', async (req, res) => {
    const redis = new Redis({ host: '172.20.0.5', port: 26379 });
    redis.on('error', err => console.log('Error connecting to Redis:', err.message));

    var teste = []
    await redis.info().then(async (result) => {
        teste = result.split('\n').slice(-2, -1)[0].slice(40, 55).split(':');
        const client = new Redis({ host: teste[0], port: teste[1] });

        client.on('error', err => console.log('Error connecting to Redis: ', err));

        await client.del(req.params.key).then(result => {
            res.send('deletado');
        }).catch(err => {
            res.status(500).send(err.message);
        });
    }).catch(err => {
        console.log(err.message);
    });
});

app.listen(3000);
