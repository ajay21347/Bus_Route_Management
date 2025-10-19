import React, { useEffect, useState } from "react";
import axios from "axios";
import RouteCard from "./components/RouteCard";
import "./App.css";

function App() {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    destination: "",
    durationHr: "",
    durationMin: "",
    stops: "",
  });
  const [theme, setTheme] = useState("pink"); // default theme

  // Fetch all routes
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/routes")
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new route
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert stops string to array
    const stopsArray = formData.stops
      ? formData.stops.split(",").map((stop) => stop.trim())
      : [];

    // Convert hours + minutes → total minutes
    const totalMinutes =
      (parseInt(formData.durationHr || 0) * 60) +
      parseInt(formData.durationMin || 0);

    const payload = {
      name: formData.name,
      source: formData.source,
      destination: formData.destination,
      duration: totalMinutes,
      stops: stopsArray,
    };

    axios
      .post("http://localhost:5000/api/routes", payload)
      .then((res) => {
        setRoutes([...routes, res.data]);
        setFormData({
          name: "",
          source: "",
          destination: "",
          durationHr: "",
          durationMin: "",
          stops: "",
        });
      })
      .catch((err) => {
        console.error("Error adding route:", err);
        alert("Failed to add route. Check console for details.");
      });
  };

  // Delete route
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/routes/${id}`)
      .then(() => setRoutes(routes.filter((route) => route._id !== id)))
      .catch((err) => console.error(err));
  };

  // Theme switcher
  const handleThemeChange = () => {
    const themes = ["pink", "blue", "green", "twilight"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <div className={`container ${theme}`}>
      <button className="theme-btn" onClick={handleThemeChange}>
        🌈 Change Theme
      </button>

      <h1>🚍 Route Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Route Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        {/* Duration: Hours + Minutes */}
        <div className="duration-field">
          <input
            type="number"
            name="durationHr"
            placeholder="Hours"
            value={formData.durationHr}
            onChange={handleChange}
            min="0"
          />
          <span className="time-label">hr</span>
          <input
            type="number"
            name="durationMin"
            placeholder="Minutes"
            value={formData.durationMin}
            onChange={handleChange}
            min="0"
            max="59"
          />
          <span className="time-label">min</span>
        </div>

        <input
          name="stops"
          placeholder="Stops (comma-separated)"
          value={formData.stops}
          onChange={handleChange}
        />
        <button type="submit">Add Route</button>
      </form>

      <div className="routes">
        {routes.map((route) => (
          <RouteCard
            key={route._id}
            route={route}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
