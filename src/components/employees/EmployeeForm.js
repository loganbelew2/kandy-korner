import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = () => {
  const [Locations, setLocations] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState([]);
  const [PayRate, setPay] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8088/locations")
      .then((response) => response.json())
      .then((locationArray) => {
        setLocations(locationArray);
      });

    fetch("http://localhost:8088/employees?_expand=user")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const nameWithoutSpaces = Name.replace(/\s/g, "");

    const userToSend = {
     "name": Name,
     "email": `${nameWithoutSpaces}@example.com`,
     "isEmployee": true
    };

    fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToSend),
    })
      .then((response) => response.json())
      .then((userData) => {
        fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": Name,
                "Pay": parseInt(PayRate),
                "Start Date": new Date (StartDate),
                "locationId": parseInt(Location),
                "userId": userData.id
              },)
        })
      })
      .then(() => {
        Navigate("/Employees");
      })
      .catch((error) => {
        console.error("Error submitting product:", error);
      });
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>New Hire</h2>
        <fieldset>
          <div>
            <label htmlFor="Name">Employee Name</label>
            <input
              id="Name"
              value={Name}
              onChange={(evt) => setName(evt.target.value)}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="date">When does this employee start?</label>
            <input
              id="date"
              type="text"
              value={StartDate}
              onChange={(evt) => setStartDate(evt.target.value)}
              placeholder="MM/DD/YYYY"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="pay">What is their pay?</label>
            <input
              id="pay"
              type="text"
              value={PayRate}
              onChange={(evt) => setPay(evt.target.value)}
              placeholder="22.50"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <select onChange={(evt) => setLocation(evt.target.value)}
            required>
              <option value={0}>Which location does this employee work</option>
              {Locations.map((loc) => (
                <option value={loc.id} key={`location--${loc.id}`}>
                  {loc.address}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

