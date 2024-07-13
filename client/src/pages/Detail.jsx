import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  // เปลี่ยนจาก [] เป็น null สำหรับเก็บข้อมูลเฉพาะผู้ใช้คนเดียว
  console.log('gumin', userData)

  /* Axios */
  // useEffect(() => {
  //     axios.get('http://localhost:3031/read/'+id)
  //     .then((res) => setUserData(res.data))
  //     .catch((err) => console.log(err))
  // },[])

  /* Fetch */
  useEffect(() => {
    fetch(`http://localhost:3031/read/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setUserData(data.results);
      })
      .catch((err) => {
        console.log("There was a problem with fetch operation", err);
      });
  }, [id]); // เพิ่ม id เข้าไปใน dependencies เพื่อให้ useEffect เรียกใช้งานเมื่อ id เปลี่ยน

  return (
    <>
      <div>
        <div>
        {/* เช็คว่า userData มีค่าและไม่ใช่ null หรือ undefined และเช็คว่ามีข้อมูลอย่างน้อย 1 รายการก่อนที่จะทำต่อไป */}
          {userData && userData.length > 0 && (
            <div>
              <h1>{userData[0].name}</h1>
              <h3>{userData[0].address}</h3>
            </div>
          )}
        {/* ใช้ index 0 เพราะว่าผลลัพธ์เป็น array ของผู้ใช้เพียงคนเดียว */}
        </div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    </>
  );
}
