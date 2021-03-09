/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import CategoryForm from './CategoryForm';
import Category from './Category';

function CategoryDashboard(props) {
  const {
    categories,
    newCategoryOnSubmit,
    editCategoryOnSubmit,
    deleteCategoryOnClick
  } = props;

  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const displayCategories = () => {
    const listOfCategories = categories.map((category, i) => {
      return (
        <Category
          key={i}
          category={category}
          setCategoryToEdit={setCategoryToEdit}
          deleteCategoryOnClick={deleteCategoryOnClick}
        />
      );
    });

    return <ul>{listOfCategories}</ul>;
  };

  const displayEditCategoryForm = (category) => {
    return (
      <CategoryForm
        newCategoryOnSubmit={newCategoryOnSubmit}
        editCategoryOnSubmit={editCategoryOnSubmit}
        updateForm="true"
        category={category}
        setCategoryToEdit={setCategoryToEdit}
      />
    );
  };

  const categoryPanel = () => {
    if (categoryToEdit) {
      return displayEditCategoryForm(
        categories.find((category) => category.category_id === categoryToEdit)
      );
    }
    return displayCategories();
  };

  return (
    <div>
      <h2>Category Interface</h2>
      <div className="category_dashboard">
        <CategoryForm
          newCategoryOnSubmit={newCategoryOnSubmit}
          editCategoryOnSubmit={editCategoryOnSubmit}
          updateForm={false}
          category={null}
        />
        {categoryPanel()}
      </div>
    </div>
  );
}

export default CategoryDashboard;
