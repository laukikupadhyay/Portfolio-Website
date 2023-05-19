import React from "react";
import NavBar from "../../components/navbar/Navbar";
import "./Additem.css"
function Additem() {
  return (
    <div>
      <NavBar />
      <div className="cardadditem">
        <div className="cardadditem-body">
          <h5 className="cardadditem-title">Add Item</h5>
          <form>
            <div className="mb-3">
              <div>
              <label for="itemname" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="itemname"
                aria-describedby="emailHelp"
              />
              </div>
              <div>
              <label for="itemdesc" className="form-label">
                Item Description
              </label>
              <input
                type="text"
                className="form-control"
                id="itemdesc"
                aria-describedby="emailHelp"
              />
              </div>
              <div>
              <label for="cat" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="cat"
                aria-describedby="emailHelp"
              />
              </div>
              <div>
              <label for="itemprice" className="form-label">
                Item Price
              </label>
              <input
                type="text"
                className="form-control"
                id="itemprice"
                aria-describedby="emailHelp"
              />
              </div>
              <label for="itemimage" className="form-label">
                Item Image
              </label>
              <input
                type="file"
                className="form-control"
                id="itemimage"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="additembutton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Additem;
