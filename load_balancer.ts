import http from 'http';
import os from 'os';
import process from 'process';
import cluster from 'cluster';
import * as dotenv from 'dotenv';
import RequestsHandler from './RequestsHandler';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const WORKER_COUNT = os.cpus().length - 1;

if (cluster.isMaster) {
    let currentWorker = 1;

    // Fork workers
    for (let i = 0; i < WORKER_COUNT; i++) {
        cluster.fork({ PORT: PORT + i + 1 });
    }

    // Load balancer
    const loadBalancer = http.createServer((req, res) => {
        const targetPort = PORT + currentWorker;
        const options = {
            hostname: 'localhost',
            port: targetPort,
            method: req.method,
            path: req.url,
            headers: req.headers,
        };

        const proxyRequest = http.request(options, (proxyRes) => {
            if (proxyRes.statusCode) {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });

        req.pipe(proxyRequest, { end: true });
        currentWorker = (currentWorker + 1) % WORKER_COUNT; // Round-robin
    });

    loadBalancer.listen(PORT, () => {
        console.log(`Load balancer listening on port ${PORT}`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Worker processes
    const workerPort = Number(process.env.PORT); // Get the port from the environment variable
    const server = http.createServer((req, res) => {
        let requestBody = '';

        req.on('data', (chunk) => {
            requestBody += chunk;
        });

        req.on('end', async () => {
            await RequestsHandler(req, res, requestBody);
        });
    });

    server.listen(workerPort, () => {
        console.log(`Worker ${process.pid} listening on port ${workerPort}`);
    });
}
