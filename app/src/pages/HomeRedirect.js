import url from '../api_url.json';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch(url['api_url'] + '/valid-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.valid) {
                    navigate('/search', { replace: true });
                } else {
                    navigate('/login', { replace: true });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate('/login', { replace: true });
            })
    }, [navigate]);
    return null
}