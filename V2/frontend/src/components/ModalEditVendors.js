import React, { useState, useEffect } from 'react';
import './ModalEditVendors.css';

const ModalEditVendors = ({ isOpen, onClose, vendorToEdit, handleEdit }) => {
  const [editedVendor, setEditedVendor] = useState(vendorToEdit);

  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      body.classList.add('modal-open');
      return () => {
        body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor({
      ...editedVendor,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    handleEdit(editedVendor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-vendor">
        <div className='form-container'>
          <form className='modal-form' onSubmit={onSave}>
            <div className="form-group-pair">
              <div>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editedVendor.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={editedVendor.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={editedVendor.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={editedVendor.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="whatsappNumber">Número de WhatsApp</label>
              <input
                type="text"
                className="form-control"
                name="whatsappNumber"
                value={editedVendor.whatsappNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-save">Guardar</button>
            </div>
          </form>
        </div>
        <span className="modal-close-product" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default ModalEditVendors;
