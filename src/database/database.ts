const {Client} = require('pg')
const client = new Client({host: 'localhost', port: 5432, user:'postgres', password:'123rainbowDash'});

//client.connect().then(() => console.log('Connected to database')).catch((err: { stack: any; }) => console.error('Database connection error', err.stack);

client.connect();

export {client};