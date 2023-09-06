
// interface WebSocketMap {
//   [userId: string]: WebSocket;
// }

// class WebSocketSingleton {
//   private myMap = new Map<string, WebSocket>();

//   getWebSocket(username: string , url: string): WebSocket {
    
//     if (!this.myMap.has(username)) {
//       this.myMap.set(username, new WebSocket(url));
//       console.log(this.myMap.get(username));
//     }
//     return this.myMap.get(username);
//   }

//   // closeWebSocket(token: string): void {
//   //   if (this.myMap.get(token)) {
//   //     this.myMap.get(token)?.close();
//   //     this.myMap.delete(token);
//   //   }
//   // }
// }

// export default new WebSocketSingleton();
