const io =require("socket.io" )(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});
let users=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId)  && users.push({userId,socketId});
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);

}

const getUser=(userId)=>{
    return users.find((user)=>user.Id===userId)
}

io.on ("connection", (socket) => {
   console.log("A user connected"); 
   //take userid and socketId
   socket.on("addUser",userId=>{
addUser(userId,socket.id);
io.emit("getUsers",users)

//send and get the messages
socket.on("sendMessage",({senderId,receiveId,text})=>{
const user= getUser(receiveId);
io.to(user.socketId).emit("getMessage",{
    senderId,text,
});

});

//when disconnected
   });
   socket.on("disconnect",()=>{
    console.log('A user disconnected');
    removeUser(socket.id);
   })

})
