import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Doughnut } from 'react-chartjs-2';
import styles from "./styles.module.scss";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title
} from 'chart.js';
import { Scatter, Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(LinearScale,
  PointElement,
  LineElement, Tooltip,
  Legend,
  BarElement, 
  CategoryScale,
  Title,);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'PH',
    },
  },
};

export const data = {
  datasets: [
    {
      label: 'Datos',
      data: Array.from({ length: 100 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Welcome = () => {
  const [reports, setReports] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3200/reports`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setReports(data))
        .catch((error) => console.error(error));
    }else{
      navigate("/login")
    }
    //console.log(reports)
  },[token]);
  //console.log(reports.Report[0].device)
  return (
    <div className={styles.schema}>
      <div className={styles.welcome}>
      <h3>{true ? `` : "¿Que estas haciendo? 🕵️‍♂️"}</h3>
      <h2>
        {true ? "Registros 🕵️‍♂️" : "Te estamos viendo..."}
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
            <th scope="col">PH</th>
            </tr>
        </thead>
        <tbody>
          {reports ? reports.Report.map((value, i)=>{
            return (
              <tr key={i}>
                <td>{value.device}</td>
                <td>{value.temperature}</td>
                <td>{value.humidity}</td>
                <td>{value.ph}</td>
              </tr>
            )
          }): ""}
        </tbody>
        </table>
      </div>
    </div>
    <div className={styles.welcome}>
        <Scatter options={options} data={data} />
    </div>
    <div className={styles.welcome}>
        <Bar options={options2} data={data2} />
    </div>
    
    </div>
    
    
  );
};

export default Welcome;