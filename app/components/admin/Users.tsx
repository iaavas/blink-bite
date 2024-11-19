import { URL } from '@/constants/constant';
import React, { useEffect, useState } from 'react'

function Users() {

    const [admins,setAdmins] = useState([]);

    useEffect(() => {
        async function fetchAdmins() {

            const res = await fetch(`${URL}/api/users`)
            const data = await res.json();
            setAdmins(data)
        }
        
    },[])
  return (
    <div>Users</div>
  )
}

export default Users;