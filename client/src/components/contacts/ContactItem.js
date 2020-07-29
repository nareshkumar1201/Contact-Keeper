import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const ContactItem = ({ contact }) => {
  const { name, email, phone, type } = contact;
  return (
    <Fragment>
      <div className="card bg-light">
        <h3 className="text-primary text-left">
          {name}
          <span
            style={{ float: "right" }}
            className={
              "badge " +
              (type === "personal" ? "badge-success" : "badge-danger")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </h3>
        <ul className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open"></i>
              {email}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone"></i>
              {phone}
            </li>
          )}
        </ul>

        <p>
          <button className="btn btn-sm btn-dark">Edit</button>
          <button className="btn btn-sm btn-danger">Delete</button>
        </p>
      </div>
    </Fragment>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
