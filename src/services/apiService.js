// src/services/apiService.js
const API_BASE_URL = 'https://localhost:7092/api/Categories';

const apiService = {
  getItems: async () => {
    const response = await fetch(`${API_BASE_URL}/GetListAsync`);
    if (!response.ok) {
      throw new Error('無法fetch種類的列表');
    }
    return response.json();
  },

  createItem: async (item) => {
    const response = await fetch(`${API_BASE_URL}/CreateAsync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error('新增種類失敗');
    }
    return response.json();
  }
};

export default apiService;
