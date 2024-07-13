import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  /* Asios */

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3031/read/" + id)
  //     .then((res) => {
  //       const user = res.data[0]; // ข้อมูลผู้ใช้คืออาเรย์ที่ 0
  //       setUserData(user);
  //       setName(user.name);
  //       setPhone(user.phone);
  //       setAddress(user.address);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);


  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   const updateUser = {
  //       name: name,
  //       phone: phone,
  //       address: address
  //   }

  //   axios.put(`http://localhost:3031/update/${id}`, updateUser)
  //   .then((res) => navigate('/'))
  //   .catch((err) => console.log(err))
  // }


  /* Fetch */

  useEffect(() => {
    fetch(`http://localhost:3031/read/${id}`)
    .then((res) => {
      if(!res.ok) {
        throw new Error("Error response was not ok");
      } return res.json();
    })
    .then((data) => {
      const user = data.results[0];
      setUserData(user)
      setName(user.name)
      setPhone(user.phone)
      setAddress(user.address)
    })
    .catch((err) => {
      console.log("there was a problem with fetch operatin", err);
    })
  },[id])

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3031/update/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        address: address
      })
    }).then((res) => {
      if(!res.ok) {
        throw new Error("Error response was not ok")
      } return navigate('/');
    }).catch((err) => {
      console.log("There was a problem with fetch operation", err);
    })
  }


  return (
    <>
      <div>
        <h2>Edit data</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              placeholder="your phone number..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
