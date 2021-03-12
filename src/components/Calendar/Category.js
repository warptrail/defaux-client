/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Category(props) {
  const { category, setCategoryToEdit, deleteCategoryOnClick } = props;

  return (
    <li className="category_item">
      <p>{category.encoded_name}</p>
      <button
        type="button"
        onClick={() => {
          setCategoryToEdit(category.category_id);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => {
          deleteCategoryOnClick(category.category_id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default Category;
