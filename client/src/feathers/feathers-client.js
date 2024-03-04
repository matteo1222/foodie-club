import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io(`${window.location.protocol}//${window.location.hostname}`);
const client = feathers();

client.configure(socketio(socket, {
  timeout: 30000
}));
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
