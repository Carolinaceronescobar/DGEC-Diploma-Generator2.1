import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../login/AuthContext';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        // Log the authorization code to the console
        //console.log("Authorization Code:", code);

        if (code) {
            axios.post('http://localhost:8000/token', { code })
                .then(response => {
                    login(response.data.access_token); // Store the token in memory
                    navigate('/resumen');
                })
                .catch(error => {
                    console.error('Error during token exchange', error);
                    navigate('/');
                });
        }
    }, [navigate, login]);

    return <div>Loading...</div>;
};

export default AuthCallback;