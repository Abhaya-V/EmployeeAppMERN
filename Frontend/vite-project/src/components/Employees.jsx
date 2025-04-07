import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {   useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@mui/material';
import axiosInstance from '../axiosInterceptor';
import Divider from '@mui/material/Divider';

const Employees = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axiosInstance.get("https://employee-app-mern-one.vercel.app/employees").then((res)=>{
     setData(res.data)
    }).catch((err) =>{
      console.log(err)
    })
  },[])

  function update_val(item){
    navigate("/addemployees",{state:{item}})
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axiosInstance .delete(`https://employee-app-mern-client.vercel.app/employees/delete/${id}`)
        .then((res) => {
          alert("Employee deleted successfully!");
          // Refresh the list
          setData(prevData => prevData.filter(emp => emp._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting employee:", err);
        });
    }
  }
 
  return (
  <Grid container spacing={2} style={{margin:"3%"}}>
    {data.map((item)=>(
    <Grid size={4}>
      <Card
  sx={{
    maxWidth: 345,
    margin: "auto",
    borderRadius: 3,
    boxShadow: 6,
    backgroundColor: "#2c2c2e",
    color: "#f5f5f5",
    transition: "transform 0.3s, box-shadow 0.3s",
    '&:hover': {
      transform: "scale(1.03)",
      boxShadow: 10,
    },
  }}
>
  <CardMedia
    component="img"
    height="250"
    image={item.employeeImage}
    alt="employee"
    sx={{
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      objectFit: "cover",
    }}
  />
  <CardContent>
    <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
      {item.employeename}
    </Typography>
    <Typography variant="subtitle1" align="center" sx={{ color: "#81d4fa" }}>
      {item.employeeDesigination}
    </Typography>
    <Divider sx={{ backgroundColor: "#555", my: 2 }} />
    <Typography variant="body2" align="center" sx={{ mt: 1}}>
      LOCATION : {item.employeeLocation}
    </Typography>
    <Typography variant="body2" align="center" sx={{ mb: 2}}>
     SALARY : ₹{item.employeeSalary}
    </Typography>


    <Divider sx={{ backgroundColor: "#555", my: 2 }} />

    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          sx={{ borderRadius: 5, px: 3, backgroundColor: "#4caf50", color: "#fff" }}
          onClick={() => update_val(item)}
        >
          Update
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{ borderRadius: 5, px: 3, backgroundColor: "#e53935", color: "#fff" }}
          onClick={() => handleDelete(item._id)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  </CardContent>
      </Card>
   






    </Grid>
    ))}
    </Grid>
    
   
  )
}

export default Employees


