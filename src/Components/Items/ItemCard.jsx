import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import productImages from "../../productsImage.json"
import { useParams } from "react-router-dom";
import { useState } from "react";

function ItemCard(props) {

  const params = useParams("");
  const [itemID, setItemID] = useState("");
  const navigate = useNavigate();


  function deleteItem() {
    axios.delete("http://localhost:8082/item/delete/" + props.id)
      .then(response => { 
        props.getItems() 
      })
      .catch(err => console.error(err))
  }

  function getImageUrl(productName) {
    const productNameLower = productName.toLowerCase();
    if (productNameLower in productImages) {
      return productImages[productNameLower];
    } else {
      return "/default.png";
    }
  }

  function addToCart() {
    const itemID = props.id
    if (!itemID) {
      console.error("Item ID is null or undefined.");
      return;
    }
    axios.post("http://localhost:8082/item/addItem/1", { id: itemID })
      .then(response => {
        console.log(response);
        props.getItems();
        alert("Item added to cart, please adjust quantity in the basket")
      }).catch(err => console.error(err))
  }

  return (
    <Card style={{ width: "300px" }} className="col-sm-6 col-md-4 col-lg-3 m-4">
      <div className="card-body ">
        <h4 className="card-title">
          {" "}
          <img
            src={getImageUrl(props.name)}
            alt="avatar"
            className="card-person"
            style={{ maxWidth: '50%', height: '50%' }}
          />
          <p> {props.name}</p>
          <p> {props.description}</p>
        </h4>
        <p>Price: £{props.price}</p>
        <button style={{ marginTop: "10px", marginRight: "15px" }} className="btn btn-success btn-md" onClick={addToCart}>Add to Cart</button>
        <button onClick={() =>
          navigate("/items/edit/" + props.id)
        } style={{ marginTop: "10px" }} type="submit" id="edit" className="btn btn-warning btn-md">
          {" "}
          Edit Item{" "}
        </button>
        <button style={{ marginTop: "10px" }} className="btn btn-danger" onClick={deleteItem}>Delete Item</button>
      </div>
    </Card>
  );
}
ItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};



export default ItemCard;