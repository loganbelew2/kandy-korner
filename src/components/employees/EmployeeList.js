import { useEffect, useState } from "react";

export const EmployeeList = () => {
    const [Employees, setEmployees] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8088/employees?_expand=user&_expand=location")
        .then(response => response.json())
        .then(data => setEmployees(data));
    }, []);
  
return <ul>
{ Employees.map(p => 
    <><li key={p.id}>{p.user.name}</li><p key={`p-${p.id}`}>{p.location.address}</p></>
    )
}
</ul>
}