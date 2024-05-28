import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ CategoryName: '', Description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiService.getItems();
      setCategories(data);
    } catch (error) {
      console.error('抓不到種類列表API啊:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await apiService.createItem(newCategory);
      setNewCategory({ CategoryName: '', Description: '' });
      fetchCategories();
    } catch (error) {
      console.error('新增種類失敗:', error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <table>
        <thead>
          <tr>
            <th>CategoryID</th>
            <th>CategoryName</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {categories.map((category, index) => (
        <tr key={index}>
          <td>{category.CategoryID}</td>
          <td>{category.CategoryName}</td>
          <td>{category.Description}</td>
        </tr>
    ))}
  </tbody>

      </table>
      <div>
        <input
          type="text"
          value={newCategory.CategoryName}
          onChange={(e) => setNewCategory({ ...newCategory, CategoryName: e.target.value })}
          placeholder="Category Name"
        />
        <input
          type="text"
          value={newCategory.Description}
          onChange={(e) => setNewCategory({ ...newCategory, Description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={handleCreate}>新增</button>
      </div>
    </div>
  );
};

export default CategoriesTable;