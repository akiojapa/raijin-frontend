export interface IMessage {
  sender: string;
  content: string;
  time: string;
}

export interface IGroup {
  whats_id: string;
  name: string;
  lastMessage: string;
  time: string;
  imageUrl: string;
  messages: IMessage[];
  participants: number;
}