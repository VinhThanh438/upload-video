import express from 'express';
import { Server } from 'http';
import apiRoutes from './routes/api.route';

const app = express();
const port = 3000;

class ExpressServer {
    private httpServer?: Server;

    public async kill(): Promise<void> {
        if (!this.httpServer) return Promise.resolve();

        return new Promise((resolve, reject) => {
            this.httpServer.close((err) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                err ? reject(err) : resolve();
            });
        });
    }

    public setHttpServer(server: Server) {
        this.httpServer = server;
    }
}

const expressServer = new ExpressServer();

const shutdownProperly = (exitCode: number) => {
    expressServer.kill()
        .then(() => {
            console.log('Shutdown complete, bye bye!');
            process.exit(exitCode);
        })
        .catch((err) => {
            console.error('Error during shutdown', err);
            process.exit(1);
        });
}

const setupShutdownHandlers = () => {
    process.on('uncaughtException', (err: unknown) => {
        console.log('Uncaught exception', err);
        shutdownProperly(1);
    });

    process.on('unhandledRejection', (reason: unknown | null | undefined) => {
        console.log('Unhandled Rejection at promise', reason);
        shutdownProperly(2);
    });

    process.on('SIGINT', () => {
        console.log('Caught SIGINT, exiting!');
        shutdownProperly(128 + 2);
    });

    process.on('SIGTERM', () => {
        console.log('Caught SIGTERM, exiting');
        shutdownProperly(128 + 2);
    });

    process.on('exit', () => {
        console.log('Exiting process...');
    });
}

app.use('/api/v1', apiRoutes);

const server = app.listen(port, () => {
    console.log('App listening on port:', port);
    expressServer.setHttpServer(server);
});

// Setup shutdown handlers
setupShutdownHandlers();