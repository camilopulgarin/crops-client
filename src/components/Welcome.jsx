import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setName(data.nombre))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div className={styles.welcome}>
      <h3>{true ? `` : "¿Que estas haciendo? 🕵️‍♂️"}</h3>
      <h2>
        {true ? "Bienvenido!  🎉" : "Te estamos viendo..."}
      </h2>
      {/*<div className={styles.buttons}>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/")}>Register</button>
  </div>*/}
      <div>
      <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">Dispositivo</th>
            <th scope="col">Temperatura</th>
            <th scope="col">Humedad</th>
            <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>45</td>
            <td>80</td>
            <td>22/03/2022</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>45</td>
            <td>80</td>
            <td>22/03/2022</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>45</td>
            <td>80</td>
            <td>22/03/2022</td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;