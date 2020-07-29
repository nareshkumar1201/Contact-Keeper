import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Naresh",
        email: "naresh.akaram@gmail.com",
        phone: "8609685710",
        type: "personal",
      },
      {
        id: 2,
        name: "Satish",
        email: "satish@gmail.com",
        phone: "775952310",
        type: "personal",
      },
      {
        id: 1,
        name: "Praneeth",
        email: "praneeth@gmail.com",
        phone: "9659685710",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ADD CONTACT

  //SET CURRENT CONTACT

  //CLEAR CONTACT

  //DELETE CONTACT

  //UPDATE CONTACT

  //FILTER CONTACT

  //CLEAR FILTER

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
