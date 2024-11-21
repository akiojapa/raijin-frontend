export interface IMessage  {
  sender: string;
  content: string;
  time: number;
}

export class Message implements IMessage {
  sender: string;
  content: string;
  time: number;

  constructor(data: { sender: string, content: string, time: number }) {
    this.sender = data.sender;
    this.content = data.content;
    this.time = data.time;
  }

  get formattedTime(): string {
    const date = new Date(this.time * 1000);
    const offset = -3
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const newDate = new Date(utc + (3600000 * offset));
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    const formattedHour = hours < 10 ? '0' + hours : hours;
    const formattedMinute = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHour}:${formattedMinute}`;
  }
}

export interface IGroup  {
  whats_id: string;
  name: string;
  imageUrl: string;
  messages: Message[];
  participants: number;
  priority: number | null;
  tags?: string[];
}

export class Group implements IGroup{
  whats_id: string;
  name: string;
  imageUrl: string;
  messages: Message[];
  participants: number;
  priority: number | null;
  tags?: string[];

  constructor(
    data: {
      whats_id: string,
      name: string,
      imageUrl: string,
      messages: Message[],
      participants: number,
      priority: number | null,
      tags?: string[]
    }
  ) {
    this.whats_id = data.whats_id;
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.messages = data.messages;
    this.participants = data.participants;
    this.priority = data.priority;
    this.tags = data.tags;
  }

  get time(): string {
    let time = ''
    const lastMessage = this.messages.at(0)
    if (lastMessage) {
      time = lastMessage.formattedTime
    }

    return time
  }

  get lastMessage(): string {
    let content = ''
    const lastMessage = this.messages.at(0)
    if (lastMessage) {
      content = lastMessage.content
    }
    return content
  }
}