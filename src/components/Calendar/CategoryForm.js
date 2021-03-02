/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function NewCategoryForm(props) {
  const [state, setState] = useState({
    realName: 'General',
    encodedName: 'eeroy',
    icon: 'circle',
    color: '#000'
  });

  const {
    newCategoryOnSubmit,
    editCategoryOnSubmit,
    updateForm,
    category,
    setCategoryToEdit
  } = props;

  useEffect(() => {
    if (category) {
      setState({
        realName: category.real_name,
        encodedName: category.encoded_name,
        icon: category.icon,
        color: category.color
      });
    }
  }, [category]);

  console.log(props);

  // handleChange for multiple inputs
  const handleChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const onClickButton = (e) => {
    e.preventDefault();

    const newCategoryObject = {
      real_name: state.realName,
      encoded_name: state.encodedName,
      icon: state.icon,
      color: state.color
    };

    if (!updateForm) {
      newCategoryOnSubmit(newCategoryObject);
    } else {
      newCategoryObject.category_id = category.category_id;
      editCategoryOnSubmit(newCategoryObject);
    }
  };

  const goBackToCategoryList = () => {
    setCategoryToEdit(null);
  };

  return (
    <form
      className="new_category_form"
      onSubmit={(e) => {
        onClickButton(e);
      }}
    >
      {updateForm ? <h3>Edit Category</h3> : <h3>Add New Category</h3>}
      {updateForm ? (
        <button type="button" onClick={goBackToCategoryList}>
          go back
        </button>
      ) : (
        ''
      )}

      <label htmlFor="categoryRealName">Real name of Category</label>
      <input
        name="realName"
        type="text"
        onChange={handleChange}
        placeholder={state.realName}
        required
      />

      <label htmlFor="categoryEncodedName">Encoded name of Category</label>
      <input
        name="encodedName"
        type="text"
        onChange={handleChange}
        placeholder={state.realName}
        required
      />

      <label htmlFor="categoryIcon">Category Font Awesome Icon</label>
      <input
        name="categoryIcon"
        type="text"
        onChange={handleChange}
        value={state.icon}
        required
      />

      <label htmlFor="categoryIconColor">Icon Color #</label>
      <input
        name="categoryIconColor"
        type="text"
        onChange={handleChange}
        value={state.color}
        required
      />
      <button type="submit">
        {updateForm ? 'Edit Category' : 'Add Category'}
      </button>
    </form>
  );
}

export default NewCategoryForm;
