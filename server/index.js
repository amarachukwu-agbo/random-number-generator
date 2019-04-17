import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './phoneNumberGenerator/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', router);

// Configure server to listen on port 3000
const port = process.env.PORT || 3000;

app.use('/', express.static('dist'));
app.use('*', express.static('dist'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});

export default app;
