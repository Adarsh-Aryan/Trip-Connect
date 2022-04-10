
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import './Header.css'

function Header() {

    const [user, setUser] = useState()

    const getUser = async () => {

        if (!sessionStorage.getItem('token')) {
            
            return;
        }

        const response = await fetch('https://trip-connect-api.herokuapp.com/api/auth/getUser', {

            method: 'GET',
            headers: {
                'auth-token': sessionStorage.getItem('token')
            }
        })

        const data = await response.json()

        

        setUser(data)

    }



    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userInfo')
        window.location = '/login'
    }

    return (
        <header className='header'>
            <Link to="/"><h1>TripConnect</h1></Link>
            <nav>
                <ul>

                    {!(sessionStorage.getItem('token')) ?
                        <li><Link to="/login">Login</Link></li>
                        : <>
                            <li>Hi {user?.name.split(' ')[0]}</li>
                            <li onClick={handleLogout}>LogOut</li>

                        </>


                    }





                </ul>
            </nav>
        </header>
    )
}



export default Header