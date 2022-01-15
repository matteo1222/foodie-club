import React from 'react'
import client from '../feathers/feathers-client'
import {
    useLocation,
    Navigate
  } from "react-router-dom"

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    const signUp = (name, email, password, resolveCallback, errorCallback) => {
        return client
            .service('users')
            .create({ name, email, password })
            .then(() => resolveCallback())
            .catch(err => errorCallback(err)) 
    }
    
    const login = (email, password, resolveCallback, errorCallback) => {
        return client
            .authenticate({
                strategy: 'local',
                email,
                password
            })
            .then(res => setUser(res.user))
            .then(() => resolveCallback())
            .catch(err => errorCallback(err));
    }

    const logout = (resolveCallback, errorCallback) => {
        return client
            .logout()
            .then(() => resolveCallback())
            .catch(err => errorCallback(err));
    }

    const value = { user, signUp, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    const location = useLocation()

    if (auth.user === null) {
        return <Navigate to='/login' state={{from: location}} replace />
    }

    return children
}