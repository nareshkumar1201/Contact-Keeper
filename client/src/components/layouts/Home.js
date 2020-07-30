import React from "react";
import Contact from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import FilterContact from "../contacts/ContactFilter";

function Home() {
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
