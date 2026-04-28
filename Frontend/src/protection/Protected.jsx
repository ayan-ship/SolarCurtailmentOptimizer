import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBackendURL } from '../utils/apiConfig'

const Protected = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null)  // ✅ null = still loading
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true  // ✅ prevent state update on unmounted component

        const verifyAuth = async () => {
            try {
                const backendURL = getBackendURL();
                const res = await fetch(`${backendURL}/auth/verify`, {
                    credentials: 'include',
                    cache: 'no-store'
                });

                if (!isMounted) return  // ✅ bail if unmounted

                if (res.ok) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                    navigate('/login')
                }
            } catch {
                if (!isMounted) return
                setIsAuth(false)
                navigate('/login')
            }
        }

        verifyAuth()

        return () => { isMounted = false }  // ✅ cleanup
    }, [navigate])

    if (isAuth === null) return <div>Loading...</div>  // ✅ actual loading state
    return isAuth ? children : null
}

export default Protected