import { IGroup } from "../interfaces/groups";

export const GROUPS: IGroup[] = [
  {
    name: 'Raijin Copilot 1',
    lastMessage: 'See you at dinner!',
    time: '18:30',
    imageUrl: 'https://picsum.photos/200?random=1',
    messages: [
      { sender: 'Alice', content: 'See you at dinner!', time: '18:30' },
      { sender: 'Bob', content: 'Sure, see you!', time: '18:31' },
      { sender: 'Usuário', content: 'I will be there!', time: '18:32' }
    ],
    participants: ['Alice', 'Bob', 'Charlie', 'Usuário']
  },
  {
    name: 'Raijin Copilot 2',
    lastMessage: 'Let\'s go to the movies!',
    time: '17:45',
    imageUrl: 'https://picsum.photos/200?random=2',
    messages: [
      { sender: 'Dave', content: 'Let\'s go to the movies! KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', time: '17:45' },
      { sender: 'Eve', content: 'I\'m in!', time: '17:46' },
      { sender: 'Usuário', content: 'Count me in!', time: '17:47' }
    ],
    participants: ['Dave', 'Eve', 'Frank', 'Usuário']
  },
  {
    name: 'Raijin Copilot 3',
    lastMessage: 'Meeting at 10 AM',
    time: '09:00',
    imageUrl: 'https://picsum.photos/200?random=3',
    messages: [
      { sender: 'Grace', content: 'Meeting at 10 AM', time: '09:00' },
      { sender: 'Heidi', content: 'Got it!', time: '09:01' },
      { sender: 'Usuário', content: 'I will join!', time: '09:02' }
    ],
    participants: ['Grace', 'Heidi', 'Ivan', 'Usuário']
  },
  {
    name: 'Raijin Copilot 4',
    lastMessage: 'Workout at 6 AM?',
    time: '20:15',
    imageUrl: 'https://picsum.photos/200?random=4',
    messages: [
      { sender: 'Judy', content: 'Workout at 6 AM?', time: '20:15' },
      { sender: 'Mallory', content: 'Sounds good!', time: '20:16' },
      { sender: 'Usuário', content: 'I will be there!', time: '20:17' }
    ],
    participants: ['Judy', 'Mallory', 'Niaj', 'Usuário']
  },
  {
    name: 'Raijin Copilot 5',
    lastMessage: 'Next meeting on Friday',
    time: '14:30',
    imageUrl: 'https://picsum.photos/200?random=5',
    messages: [
      { sender: 'Olivia', content: 'Next meeting on Friday', time: '14:30' },
      { sender: 'Peggy', content: 'Okay!', time: '14:31' },
      { sender: 'Usuário', content: 'I will be there!', time: '14:32' }
    ],
    participants: ['Olivia', 'Peggy', 'Sybil', 'Usuário']
  },
  {
    name: 'Raijin Copilot 6',
    lastMessage: 'Tickets booked for Paris!',
    time: '11:00',
    imageUrl: 'https://picsum.photos/200?random=6',
    messages: [
      { sender: 'Trent', content: 'Tickets booked for Paris!', time: '11:00' },
      { sender: 'Victor', content: 'Can\'t wait!', time: '11:01' },
      { sender: 'Usuário', content: 'Excited!', time: '11:02' }
    ],
    participants: ['Trent', 'Victor', 'Walter', 'Usuário']
  },
  {
    name: 'Raijin Copilot 7',
    lastMessage: 'Game night at 8 PM',
    time: '19:45',
    imageUrl: 'https://picsum.photos/200?random=7',
    messages: [
      { sender: 'Xander', content: 'Game night at 8 PM', time: '19:45' },
      { sender: 'Yvonne', content: 'I\'ll be there!', time: '19:46' },
      { sender: 'Usuário', content: 'Count me in!', time: '19:47' }
    ],
    participants: ['Xander', 'Yvonne', 'Zara', 'Usuário']
  },
  {
    name: 'Raijin Copilot 8',
    lastMessage: 'Recipe for tonight?',
    time: '16:20',
    imageUrl: 'https://picsum.photos/200?random=8',
    messages: [
      { sender: 'Alice', content: 'Recipe for tonight?', time: '16:20' },
      { sender: 'Bob', content: 'I have a great one!', time: '16:21' },
      { sender: 'Usuário', content: 'Can\'t wait to try it!', time: '16:22' }
    ],
    participants: ['Alice', 'Bob', 'Charlie', 'Usuário']
  },
  {
    name: 'Raijin Copilot 9',
    lastMessage: 'Exam prep session tomorrow',
    time: '13:00',
    imageUrl: 'https://picsum.photos/200?random=9',
    messages: [
      { sender: 'Dave', content: 'Exam prep session tomorrow', time: '13:00' },
      { sender: 'Eve', content: 'Let\'s do it!', time: '13:01' },
      { sender: 'Usuário', content: 'I will join!', time: '13:02' }
    ],
    participants: ['Dave', 'Eve', 'Frank', 'Usuário']
  },
  {
    name: 'Raijin Copilot 10',
    lastMessage: 'Community meeting on Saturday',
    time: '10:30',
    imageUrl: 'https://picsum.photos/200?random=10',
    messages: [
      { sender: 'Grace', content: 'Community meeting on Saturday', time: '10:30' },
      { sender: 'Heidi', content: 'I\'ll be there!', time: '10:31' },
      { sender: 'Usuário', content: 'Looking forward to it!', time: '10:32' }
    ],
    participants: ['Grace', 'Heidi', 'Ivan', 'Usuário']
  },
  {
    name: 'Raijin Copilot 11',
    lastMessage: 'Practice session at 5 PM',
    time: '15:45',
    imageUrl: 'https://picsum.photos/200?random=11',
    messages: [
      { sender: 'Judy', content: 'Practice session at 5 PM', time: '15:45' },
      { sender: 'Mallory', content: 'Got it!', time: '15:46' },
      { sender: 'Usuário', content: 'I will be there!', time: '15:47' }
    ],
    participants: ['Judy', 'Mallory', 'Niaj', 'Usuário']
  },
  {
    name: 'Raijin Copilot 12',
    lastMessage: 'Event planning at 3 PM',
    time: '12:00',
    imageUrl: 'https://picsum.photos/200?random=12',
    messages: [
      { sender: 'Olivia', content: 'Event planning at 3 PM', time: '12:00' },
      { sender: 'Peggy', content: 'Sounds good!', time: '12:01' },
      { sender: 'Usuário', content: 'I will join!', time: '12:02' }
    ],
    participants: ['Olivia', 'Peggy', 'Sybil', 'Usuário']
  }
];