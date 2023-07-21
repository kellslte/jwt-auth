import express from 'express';
import morgan from 'morgan';
import config from './config/main.config.js';
import routes from './routes/main.routes.js';
import connectToDatabase from './database/config.database.js';

const app = express();
app.use( express.json( { extended: true } ) );
app.use( morgan( 'dev' ) )

app.use( '/api/v1', routes );

connectToDatabase( config );

app.listen( config.port, () => console.log( `🚀 Application is listening on port ${config.port}` ) );