import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; 

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:3001/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div className="admin-appointments">
      <h2>📅 All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Mode</th>
              <th>Counselor</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, i) => (
              <tr key={i}>
                <td>{appt.name}</td>
                <td>{appt.email}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.phone}</td>
                <td>{appt.mode}</td>
                <td>{appt.counselor}</td>
                <td>{appt.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
