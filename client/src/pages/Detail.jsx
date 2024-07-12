import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Detail() {
    const {id} = useParams();
    const [userData ,setUserData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3031/read/'+id)
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err))
    },[])
  return (
    <>
        <div>
            {userData.map((val, key) => (
                <div key={key}>
                    <h1>{val.name}</h1>
                    <h3>{val.address}</h3>
                </div>
            ))}
            <div>
                <Link to='/'>Back</Link>
            </div>
        </div>
    </>
  )
}
