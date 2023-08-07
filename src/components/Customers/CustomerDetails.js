
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  const { customerId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data[0]));
  }, [customerId]);

  return (
    <>
      <p>{customer.user && customer.user.name}</p>
    </>
  );
};
