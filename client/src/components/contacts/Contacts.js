import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "../contacts/ContactItem";
import SpinnerComp from "../layouts/SpinnerComp";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  console.log(contacts);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add Contact....</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <div>
          {filtered !== null
            ? filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </div>
      ) : (
        <SpinnerComp />
      )}
    </Fragment>
  );
};

export default Contacts;
