import React, { useContext, useEffect } from "react";
import Contact from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import FilterContact from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";

function Home() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContact />
        <Contact />
      </div>
    </div>
  );
}

export default Home;
