import httpClient from "../Config/Axioshelper"; // ✅ No curly braces

export const createRoom = async (roomId) => {
  try {
    const response = await httpClient.post("api/v1/rooms",{roomid :roomId});
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
export const joinChatApi= async (roomId)=>{
   
    const response= await httpClient.get(`/api/v1/rooms/${roomId}`);
    return response.data;

};

export const getMessages=async(roomId,size=50,page=0)=>{

    const response= await httpClient.get(`/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`);
    return response.data;
};