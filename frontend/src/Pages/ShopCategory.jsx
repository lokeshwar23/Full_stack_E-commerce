import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { backend_url } from "../App";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortType, setSortType] = useState('default');

  const fetchInfo = () => { 
    fetch(`${backend_url}/allproducts`) 
      .then((res) => res.json()) 
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const getSortedProducts = () => {
    const filteredProducts = allproducts.filter(item => props.category === item.category);
    let sortedProducts = [...filteredProducts];
    if (sortType === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'name-desc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === 'price-asc') {
      sortedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (sortType === 'price-desc') {
      sortedProducts.sort((a, b) => b.new_price - a.new_price);
    }
    return sortedProducts;
  };

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - 12</span> out of {getSortedProducts().length} Products
        </p>
        <div className="shopcategory-sort">
          <select onChange={handleSortChange} value={sortType} className="sort-dropdown">
            <option value="default">Sort by</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {getSortedProducts().map((item, i) => (
          <Item
            id={item.id}
            key={i}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
