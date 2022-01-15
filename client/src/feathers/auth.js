import client from './feathers-client'

export const signUp = (email, password, resolveCallback, errorCallback) => {
    return client
        .service('users')
        .create({ email, password })
        .then(() => resolveCallback())
        .catch(err => errorCallback(err)) 
}

export const logIn = (email, password, resolveCallback, errorCallback) => {
    return client
        .authenticate({
            strategy: 'local',
            email,
            password,
        })
        .then(() => resolveCallback())
        .catch(err => errorCallback(err));
}