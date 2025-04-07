import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import UserNavbar from './UserNavbar'; 
import axiosInstance from '../axiosInterceptor';
import Divider from '@mui/material/Divider';

const ViewEmployees = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("http://localhost:3000/employees")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <UserNavbar/>
    <Grid container spacing={2} style={{ margin: "3%" }}>
      {data.map((item) => (
        <Grid size={4} key={item._id}>
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
            </CardContent>
                </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ViewEmployees;
