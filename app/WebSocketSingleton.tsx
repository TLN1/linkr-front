
interface WebSocketMap {
  [userId: string]: WebSocket;
}

class WebSocketSingleton {
  private myMap = new Map<string, WebSocket>();

  getWebSocket(token: string , url: string): WebSocket {
    console.log(this.myMap.has(token));
    
    if (!this.myMap.has(token)) {
      this.myMap.set(token, new WebSocket(url));
      console.log(this.myMap.get(token));
    }
    return this.myMap.get(token);
  }

  // closeWebSocket(token: string): void {
  //   if (this.myMap.get(token)) {
  //     this.myMap.get(token)?.close();
  //     this.myMap.delete(token);
  //   }
  // }
}

export default new WebSocketSingleton();
