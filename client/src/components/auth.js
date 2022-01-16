import React from 'react'
import client from '../feathers/feathers-client'
import {
    useLocation,
    Navigate
  } from "react-router-dom"
  import LoadingScreen from '../screens/LoadingScreen'

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        // login using JWT if page is refreshed and JWT is valid
        client.reAuthenticate()
            .then(res => {
                setUser(res.user)
                console.log('res.user', res.user)
            })
            .finally(() => setLoading(false))
    }, [])

    const signUp = (name, email, password, resolveCallback, errorCallback) => {
        return client
            .service('users')
            .create({ name, email, password })
            .then(() => resolveCallback())
            .catch(err => errorCallback(err)) 
    }
    
    const login = (email, password, resolveCallback, errorCallback) => {
        setLoading(true)
        return client
            .authenticate({
                strategy: 'local',
                email,
                password
            })
            .then(res => setUser(res.user))
            .then(() => resolveCallback())
            .catch(err => errorCallback(err))
            .finally(() => setLoading(false));
    }

    const logout = (resolveCallback, errorCallback) => {
        setLoading(true)
        return client
            .logout()
            .then(() => resolveCallback())
            .catch(err => errorCallback(err))
            .finally(() => setLoading(false));
    }

    const value = { user, loading, signUp, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    const location = useLocation()
    console.log('auth.loading', auth.loading)
    console.log('auth.user', auth.user)

    if (auth.loading) {
        console.log('authenticating')
        return <LoadingScreen/>
    }
    if (auth.user === null) {
        return <Navigate to='/login' state={{from: location}} replace />
    }

    return children
}