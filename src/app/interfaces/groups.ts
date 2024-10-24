export interface IMessage {
    sender: string;
    content: string;
    time: string;
  }
  
export interface IGroup {
    name: string;
    lastMessage: string;
    time: string;
    imageUrl: string;
    messages: IMessage[];
    participants: string[];
    priority: number| null;
  }