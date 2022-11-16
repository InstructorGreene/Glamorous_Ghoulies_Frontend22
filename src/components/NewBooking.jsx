import React from "react";
import "./NewBooking.css";

const NewBooking = () => {
  return (
    <div>
      <div className="title">
        <h2>Booking Registration</h2>
      </div>
      <div className="selectstall">
        <p1>Select type of stall:</p1>
        <input
          type="checkbox"
          name="stallbtn"
          // VALUE TBC
          value=""
        />
        Craft
        <input
          type="checkbox"
          name="stallbtn"
          // VALUE TBC
          value=""
        />
        Commercial
        <input
          type="checkbox"
          name="stallbtn"
          // VALUE TBC
          value=""
        />
        Charity
      </div>
      <div className="personal">
        <h2>First name</h2>
        <textarea
          name=""
          type="text"
          // VALUE TBC
          value=""
          placeholder="First name"
        />
        <h2>Last Name</h2>
        <textarea
          name=""
          type="text"
          // VALUE TBC
          value=""
          placeholder="Last Name"
        />
        <h2>Email</h2>
        <textarea
          name=""
          type="text"
          // VALUE TBC
          value=""
          placeholder="Email"
        />
        <h2>Phone number</h2>
        <textarea
          name=""
          type="number"
          // VALUE TBC
          value=""
          placeholder="0000-000-000"
        />
        <h2>Any aditionl information that you whant to share before booking?</h2>
        <textarea
          name=""
          type="text"
          // VALUE TBC
          value=""
          placeholder="Enter yout comment here..."
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewBooking;
