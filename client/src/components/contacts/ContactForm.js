import React, { useState } from "react";

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form action="#">
        <h3 className="text-primary">AddContact</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={onChange}
        />
        <h5 className="text-primary">Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
        />
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
        />
        Professional
        <div>
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
