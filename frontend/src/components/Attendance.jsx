// src/components/Attendance/Attendance.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AttendanceTable from './Attendance/AttendanceTable';
import AttendanceStats from './Attendance/AttendanceStats';
import AttendanceSearch from './Attendance/AttendanceSearch';
import Calendar from './Calender';
import Cookies from 'js-cookie'; 
import { Link ,useNavigate } from 'react-router-dom';


const Attendance = () => {

  const [longitude,setLongitude] = useState();
  const [latitude,setLatitude] = useState();
  const navigate = useNavigate();

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position.coords.latitude + ", " +position.coords.longitude);
     setLatitude(position.coords.longitude)
     setLongitude(position.coords.latitude);
   })
   const token = Cookies.get("jwt11");
   const id = Cookies.get("employeeID");

   const AttendanceHere = async (data) => {
    console.log(token);
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance`, {
          id:id,
          latitude:latitude,
          longitude:longitude
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        console.log("User registered successfully:", response.data);
    } catch (error) {
        console.log("ERROR: ", error.response ? error.response.data : error.message);
        if(error.response.data.error=="jwt malformed"){
          navigate("/api/login");
        } 
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Calendar />
      </div>
      

      <div>
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Attendance Dashboard
        </Typography>
      </div>
      <AttendanceSearch />
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <AttendanceStats />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <AttendanceTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default Attendance;
