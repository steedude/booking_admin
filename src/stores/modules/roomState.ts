import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('roomState', () => {
  // 會議室Array
  const roomList: any = [];

  //  取得所有會議室資訊
  async function getRoomList() {
    // GET /api/admin/products
    console.log('getRoomList');
    const data: any = await axios.get('/api/admin/products');
    console.log(data);
    return roomList;
  }

  return {
    roomList,
    getRoomList,
  };
});
