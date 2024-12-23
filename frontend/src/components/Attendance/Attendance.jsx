// src/components/Attendance/Attendance.js
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';
import AttendanceSearch from './AttendanceSearch';
import Calendar from '../Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/Attendance.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [absData, setAbsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude + ', ' + position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const token = Cookies.get("jwt11");

  const id = Cookies.get('employeeID');

  const AttendanceHere = async () => {
    console.log(token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance`,
        {
          id: id,
          latitude: latitude,
          longitude: longitude,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User Attendance successfully:', response.data);
      alert('Mark Your Attendance Successfully');
    } catch (error) {
      alert('Mark Your Attendance Already Or Any Error');
      console.log('ERROR: ', error);
    }
  };

  const getAttendanceDatas = async () => {
    console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User Fetch successfully:', response.data);
      setAttendanceData(response.data.attendance); 
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };
  //Apply Leave
  const getLeaveDates= async () => {
    console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/listget/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.leaveDates)
      setLeaveData(response.data.leaveDates)
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  //Without Apply Leave
  const getTotalWithoutApplyLeave = async () => {
    console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance/getabs/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Here Data is: ",response.data.absentDays) 
      setAbsData(response.data.absentDays);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    await getLeaveDates();
   await getAttendanceDatas();
   await getTotalWithoutApplyLeave();
   }
   fetchData();
  }, []);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    const newFilteredData = attendanceData.filter((item) =>
      item.date.startsWith(newMonth)
    );
    setFilteredData(newFilteredData);
  };

  const attendanceDates = attendanceData.map((record) => ({
    date: new Date(record.date).toDateString(),  
    status: record.status,  
  })); 
  const leaveDatas = leaveData.map((record) => ({
    fromDate: new Date(record.fromDate).toDateString(),
    toDate: new Date(record.toDate).toDateString(),
    type: 'leave',  
  })); 

const absDatas = absData.map((date) => ({
  date: new Date(date.date),
  type: 'absent',
}));

 
  

  return (
    <div className='dashboard-container'>
      <div>
        <Typography variant='h3' className='dashboard-heading'>
          Attendance Dashboard
        </Typography>
      </div>

      
      <div className='calendar-fixed'>
        <Calendar attendanceDates={attendanceDates} leaveDatas={leaveDatas} absDatas={absDatas}/>
      </div>

      <div className=' '>
         <button  onClick={AttendanceHere}>MARK_Attendance</button>
      </div>
 
    </div>
  );
};

export default Attendance;
