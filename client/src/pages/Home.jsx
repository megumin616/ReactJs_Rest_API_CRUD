import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [dataUser, setDataUser] = useState([]);
  console.log("data", dataUser);

  useEffect(() => {
    axios
      .get("http://localhost:3031/")
      // .then((res) => res.json()) ไม่จำเป็นต้อง .json เพราะ axios แปรงมาให้แล้ว
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteuser = (id) => {
    axios.delete(`http://localhost:3031/delete/${id}`)
    .then((res) => window.location.reload())
    .catch((err) => console.log(err))
  }
  return (
    <>
      <div>
        <div>
            <h2>Users data</h2>
            <Link to='/create' style={{backgroundColor: 'green', width: "8rem", color: 'white'}}>Create +</Link>
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
                  <Link to={`/read/${val.id}`} style={{ backgroundColor: "blue", color: "white" }}>
                    Read Address
                  </Link>
                  <Link to={`/edit/${val.id}`} style={{ backgroundColor: "green", color: "white", margin: "0 1rem" }}>
                    Edit
                  </Link>
                  <button onClick={() => deleteuser(val.id)} style={{ backgroundColor: "red", color: "white" }}>
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
