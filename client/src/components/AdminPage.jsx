import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminShops,
  addShop,
  deleteShop,
  updateShop,
} from "../slices/adminSlice";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { shops } = useSelector((state) => state.admin);

 
  const [form, setForm] = useState({
    shopName: "",
    contact: "",
    address: "",
    lat: "",
    lng: "",
    shopImage: "",
  });


  const [editingShop, setEditingShop] = useState(null);

  useEffect(() => {
    dispatch(getAdminShops());
  }, [dispatch]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAdd = () => {
    dispatch(
      addShop({
        ...form,
        location: {
          lat: Number(form.lat),
          lng: Number(form.lng),
        },
      })
    );


    setForm({
      shopName: "",
      contact: "",
      address: "",
      lat: "",
      lng: "",
      shopImage: "",
    });
  };


  const handleEditClick = (shop) => {
    setEditingShop({
      _id: shop._id,
      shopName: shop.shopName,
      contact: shop.contact,
      address: shop.address,
      lat: shop.location?.lat || "",
      lng: shop.location?.lng || "",
      shopImage: shop.shopImage,
    });
  };


  const handleUpdate = () => {
    dispatch(
      updateShop({
        id: editingShop._id,
        shopName: editingShop.shopName,
        contact: editingShop.contact,
        address: editingShop.address,
        shopImage: editingShop.shopImage,
        location: {
          lat: Number(editingShop.lat),
          lng: Number(editingShop.lng),
        },
      })
    );

    setEditingShop(null);
  };

  return (
    <div className="admin-container">

      <div className="admin-form">
        <h2>Add New Shop</h2>

        <input
          name="shopName"
          placeholder="Shop Name"
          value={form.shopName}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <div className="row">
          <input
            name="lat"
            placeholder="Latitude"
            value={form.lat}
            onChange={handleChange}
          />

          <input
            name="lng"
            placeholder="Longitude"
            value={form.lng}
            onChange={handleChange}
          />
        </div>

        <input
          name="shopImage"
          placeholder="Image URL"
          value={form.shopImage}
          onChange={handleChange}
        />

        <button onClick={handleAdd}>Add Shop</button>
      </div>

     
      <div className="admin-list">
        <h2>All Shops</h2>

        <div className="cards">
          {shops.map((shop) => (
            <div className="card" key={shop._id}>

              <img src={shop.shopImage} alt={shop.shopName} />

              
              <button
                className="edit-btn"
                onClick={() => handleEditClick(shop)}
              >
                EDIT
              </button>

              <div className="info">
                <h3>{shop.shopName}</h3>
                <p>{shop.address}</p>
                <p>{shop.contact}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => dispatch(deleteShop(shop._id))}
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      </div>

      
      {editingShop && (
        <div className="edit-modal">
          <div className="edit-box">

            <h2>Edit Shop</h2>

            <input
              value={editingShop.shopName}
              onChange={(e) =>
                setEditingShop({
                  ...editingShop,
                  shopName: e.target.value,
                })
              }
              placeholder="Shop Name"
            />

            <input
              value={editingShop.contact}
              onChange={(e) =>
                setEditingShop({
                  ...editingShop,
                  contact: e.target.value,
                })
              }
              placeholder="Contact"
            />

            <input
              value={editingShop.address}
              onChange={(e) =>
                setEditingShop({
                  ...editingShop,
                  address: e.target.value,
                })
              }
              placeholder="Address"
            />

            <input
              value={editingShop.shopImage}
              onChange={(e) =>
                setEditingShop({
                  ...editingShop,
                  shopImage: e.target.value,
                })
              }
              placeholder="Image URL"
            />

            <div className="row">
              <input
                value={editingShop.lat}
                onChange={(e) =>
                  setEditingShop({
                    ...editingShop,
                    lat: e.target.value,
                  })
                }
                placeholder="Latitude"
              />

              <input
                value={editingShop.lng}
                onChange={(e) =>
                  setEditingShop({
                    ...editingShop,
                    lng: e.target.value,
                  })
                }
                placeholder="Longitude"
              />
            </div>

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingShop(null)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
