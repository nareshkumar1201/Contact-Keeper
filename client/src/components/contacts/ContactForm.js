import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, current, updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);
  const [contactState, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contactState;

  const onChange = (e) => {
    setContact({ ...contactState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactState);
    } else {
      updateContact(contactState);
    }
    clearAll();
    // setContact({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   type: "personal",
    // });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <form action="#" onSubmit={onSubmit}>
        <h3 className="text-primary">
          {current ? "Edit Contact" : "Add Contact"}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={onChange}
          required
        />
        <h5 className="text-primary">Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />
        Professional
        <div>
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value={current ? "Update Contact" : "Add Contact"}
          />
        </div>
        {current && (
          <div>
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
