
import { io } from 'socket.io-client';
const roomSocket = io('http://18.222.120.14:5000', {
    transports: ['websocket'],
    jsonp: false
});
export default roomSocket