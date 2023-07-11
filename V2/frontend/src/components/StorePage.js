import React, { useState } from 'react';
import './StorePage.css'; // Importa el archivo de estilos CSS

function StorePage() {
  const [categories, setCategories] = useState([
    'Frutas',
    'Verduras',
    'Cereales',
    'Hortalizas',
    // Agrega más categorías según sea necesario
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Producto 1',
      price: 10.99,
      image: 'https://example.com/product1.jpg',
      description: 'Descripción del producto 1',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 19.99,
      image: 'https://example.com/product2.jpg',
      description: 'Descripción del producto 2',
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 5.99,
      image: 'https://example.com/product3.jpg',
      description: 'Descripción del producto 3',
    },
    // Agrega más productos según sea necesario
  ]);

  const [sortOption, setSortOption] = useState('');

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  const showProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      console.log(`Detalles del producto ${productId}:`, product);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="store-page">
      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>

      <div className="product-list">
        <div className="product-list-header">
          <h3>Productos</h3>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
        </div>

        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <div className="product-actions">
              <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
              <span className="product-info-icon" onClick={() => showProductDetails(product.id)}>
                ℹ️
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;




//PARTE PARA CUANDO LA BASE DE DATOS ESTE LISTA
/*
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './StorePage.css'; // Importa el archivo de estilos CSS

// Configura la conexión a Firebase
const firebaseConfig = {
  // Configura tu información de conexión a Firebase
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

function StorePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtiene las categorías desde Firebase
    const categoriesRef = firebase.database().ref('categories');
    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      const categoriesArray = Object.keys(categoriesData).map((categoryId) => ({
        id: categoryId,
        name: categoriesData[categoryId].name,
      }));
      setCategories(categoriesArray);
    });

    // Obtiene los productos desde Firebase
    const productsRef = firebase.database().ref('products');
    productsRef.on('value', (snapshot) => {
      const productsData = snapshot.val();
      const productsArray = Object.keys(productsData).map((productId) => ({
        id: productId,
        name: productsData[productId].name,
        price: productsData[productId].price,
      }));
      setProducts(productsArray);
    });
  }, []);

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  return (
    <div className="store-page">
      <h1 className="store-page-title">Tienda</h1>

      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;
*/