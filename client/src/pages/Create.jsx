import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  /* Axios */
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:3031/create", { name, phone, address })
  //   .then((res) => {
  //       setName('')
  //       setPhone('')
  //       setAddress('')
  //       navigate('/')
  //   })
  //   .catch((err) => console.log(err))
  // };

  /* Fetch */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3031/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        //ให้เซิร์ฟเวอร์ทราบว่าข้อมูลที่ถูกส่งไปคือ JSON ไม่ใช่ข้อความธรรมดา
        //Content-Type typeเนื้อหาคือ || application/json คือ json
      },
      body: JSON.stringify({
        // JSON.stringify เป็นฟังก์ชันใน JavaScript ที่ใช้สำหรับแปลง Object หรือ Array เป็น JSON string
        name: name,
        phone: phone,
        address: address
      })
    }).then((res) => {
      if(!res.ok) {
        throw new Error('Network response was not ok')
      } return res.json()
      .then((data) => {
        console.log(data.message)
        setName('')
        setPhone('')
        setAddress('')
        navigate('/')
      })
    }).catch((err) => {
      console.log("There was a problem with fetch operation", err);
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="your name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              placeholder="your phone number..."
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="your address..."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
