import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [dataUser, setDataUser] = useState([]);
  console.log("data", dataUser);

  /* การใช้แบบ Axios */
  //ส่วนดึงข้อมูล
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3031/")
  //     // .then((res) => res.json()) ไม่จำเป็นต้อง .json เพราะ axios แปรงมาให้แล้ว
  //     .then((res) => setDataUser(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  //ส่วน Delete
  // const deleteuser = (id) => {
  //   axios.delete(`http://localhost:3031/delete/${id}`)
  //   .then((res) => window.location.reload())
  //   .catch((err) => console.log(err))
  // }

  /* การใช้แบบ Fetch */
  //ส่วนดึงข้อมูล
  useEffect(() => {
    fetch("http://localhost:3031/")
      .then((res) => {
        if (!res.ok) {
          console.log("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setDataUser(data))
      .catch((err) => console.log(err));
  }, []);

  //ส่วน Delete
  const deleteuser = (id) => {
    fetch(`http://localhost:3031/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Network response was not ok");
            //throw จะหยุดการทำงานของโค้ดในทันทีและไม่ดำเนินการส่วนที่เหลือของ then 
            //ข้อผิดพลาดที่โยนด้วย throw new Error() จะถูกส่งต่อไปยัง catch 
            //ซึ่งทำให้สามารถจัดการกับข้อผิดพลาดนั้นได้อย่างเหมาะสม เช่น การบันทึกข้อความข้อผิดพลาดหรือแสดงข้อความแจ้งเตือนผู้ใช้
          })
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        window.location.reload();
      })
      .catch((err) =>
        console.log("There was a problem with the fetch operation:", err)
      );
  };
  return (
    <>
      <div>
        <div>
          <h2>Users data</h2>
          <Link
            to="/create"
            style={{ backgroundColor: "green", width: "8rem", color: "white" }}
          >
            Create +
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>FullName</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((val, key) => (
              <tr key={key}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.phone}</td>
                {/* <td>{val.address}</td> */}
                <id>
                  <Link
                    to={`/read/${val.id}`}
                    style={{ backgroundColor: "blue", color: "white" }}
                  >
                    Read Address
                  </Link>
                  <Link
                    to={`/edit/${val.id}`}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      margin: "0 1rem",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteuser(val.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </id>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
