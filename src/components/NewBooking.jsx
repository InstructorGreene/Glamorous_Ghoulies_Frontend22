import React from "react";
import "./NewBooking.css";

const NewBooking = () => {
  return (
    <div className="containerbox1">
      <div className="col-4 title">
        <h2>Booking Registration</h2>
        <form className="row title">
          <p1>Select type of stall:</p1>

          <div className="col-3 btn1">
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

          <input
            name="bookingName"
            type="text"
            // VALUE TBC
            value=""
            placeholder="Name or Business..."
          />
          <input
            name="bookingEmail"
            type="text"
            // VALUE TBC
            value=""
            placeholder="Email..."
          />
          <input
            name="bookingTel"
            type="text"
            // VALUE TBC
            value=""
            placeholder="Telephone no..."
          />
          <input
            className="textArea"
            name="bookingComments"
            type="text"
            // VALUE TBC
            value=""
            placeholder="Additional Comments..."
          />
          <button className="button1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBooking;
