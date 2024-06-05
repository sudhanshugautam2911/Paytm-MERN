import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }else {
            navigate('/signup')
        }
        setLoading(false);
    }, [navigate])

    if (loading) {
        return <div>Loading...</div>;
      }

    if (!isAuthenticated) {
        return null;
    }
    
    return (
        <div>
            {children}
        </div>
    )
}

export default Protected