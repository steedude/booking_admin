import { defineStore } from 'pinia';

export default defineStore('roomStateStore', () => {
  // 會議室Array
  const roomList: any = [];

  //  取得所有會議室資訊
  async function getRoomList() {
    // GET /api/admin/products
    console.log('getRoomList');
  }

  // 建立會議室
  async function createNewRoom() {
    // POST /api/admin/product
    console.log('createNewRoom');
  }

  // 更新會議室資訊
  async function updateRoomInfo() {
    // PUT /api/admin/product/:product_id
    console.log('updateRoomInfo');
  }

  // 刪除會議室
  async function deleteRoom() {
    // DELETE /api/admin/product/:product_id
    console.log('deleteRoom');
  }

  return {
    roomList,
    getRoomList,
    createNewRoom,
    updateRoomInfo,
    deleteRoom,
  };
});
