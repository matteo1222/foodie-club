import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));
client.configure(
    feathers.authentication({
        storage: window.localStorage,
    })
);

// TODO: add redirection to /login page when token expired
client.hooks({
    error (context) {
        const { error } = context

        if (error.code === 401) {
            client.emit('authFailure', error)
        }

        return context
    }
})

export default client;