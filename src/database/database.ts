const {Client} = require('pg')
const {platform} = require('os')


function configuration() {
    //configuration
    const linuxConfig = {
        'host': 'localhost',
        'port': 5434,
        'user': 'postgres',
        'password': 'postgres'
    }

    const windowsConfig = {
        'host': 'localhost',
        'port': 5432,
        'user': 'postgres',
        'password': '123rainbowDash'
    }
    return platform() == 'win32' ? windowsConfig : linuxConfig;
}

const config = configuration(); //we get the configuration depending on the os

const client = new Client({host: config['host'], port: config['port'], user:config['user'], password:config['password']});

//client.connect().then(() => console.log('Connected to database')).catch((err: { stack: any; }) => console.error('Database connection error', err.stack);

client.connect();

export {client};