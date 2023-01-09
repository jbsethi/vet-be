import app from './server';
import { intializeDB } from './database';
import logger from './shared/logger'

// Start the server
const port = Number(process.env.PORT || 4000);

// Initialize DB
intializeDB();

app.listen(port, () => {
   logger.info('Express server started on port: ' + port);
});