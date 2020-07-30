import React, { Fragment, useRef, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");
  const { filterContacts, clearFilter } = contactContext;

  //   useEffect(() => {
  //     if (filtered === null) {
  //       return (text.current.value = "");
  //     }
  //   }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Fragment>
      <form>
        <input
          type="text"
          placeholder="Filter Contacts..."
          onChange={onChange}
        />
      </form>
    </Fragment>
  );
};

export default ContactFilter;
