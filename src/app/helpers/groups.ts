import { Group, Message } from "../interfaces/groups";

export const GROUPS: Group[] = [
  new Group({
    whats_id: '120363333152450709@g.us',
    name: 'Teste',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    messages: [
      new Message({ sender: 'Alice', content: 'See you at dinner!', time: 1731349800 }),
      new Message({ sender: 'Bob', content: 'Sure, see you!', time: 1731349860 }),
      new Message({ sender: 'Usuário', content: 'I will be there!', time: 1731349920 })
    ],
    participants: 4,
    priority: 4,
    tags: ['Tag 1', 'Tag 2', 'Tag 3']
  }),
  new Group({
    whats_id: '120363217209632703@g.us',
    name: 'Raijin Group - 06',
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    messages: [
      new Message({ sender: 'Dave', content: 'Let\'s go to the movies! KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', time: 1731347100 }),
      new Message({ sender: 'Eve', content: 'I\'m in!', time: 1731347160 }),
      new Message({ sender: 'Usuário', content: 'Count me in!', time: 1731347220 })
    ],
    participants: 4,
    priority: 4,
    tags: ['Tag 2', 'Tag 5']
  }),
  new Group({
    whats_id: '120363321720242985@g.us',
    name: 'Só as antas - Versão ZAP',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    messages: [
      new Message({ sender: 'Grace', content: 'Meeting at 10 AM', time: 1731315600 }),
      new Message({ sender: 'Heidi', content: 'Got it!', time: 1731315660 }),
      new Message({ sender: 'Usuário', content: 'I will join!', time: 1731315720 })
    ],
    participants: 5,
    priority: 4,
    tags: ['Tag 3', 'Tag 4', 'Tag 5']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 4',
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    messages: [
      new Message({ sender: 'Judy', content: 'Workout at 6 AM?', time: 1731356100 }),
      new Message({ sender: 'Mallory', content: 'Sounds good!', time: 1731356160 }),
      new Message({ sender: 'Usuário', content: 'I will be there!', time: 1731356220 })
    ],
    participants: 10,
    priority: 4,
    tags: ['Tag 5']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 5',
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    messages: [
      new Message({ sender: 'Olivia', content: 'Next meeting on Friday', time: 1731335400 }),
      new Message({ sender: 'Peggy', content: 'Okay!', time: 1731335460 }),
      new Message({ sender: 'Usuário', content: 'I will be there!', time: 1731335520 })
    ],
    participants: 100,
    priority: 4,
    tags: ['Tag 2', 'Tag 4']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 6',
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    messages: [
      new Message({ sender: 'Trent', content: 'Tickets booked for Paris!', time: 1731322800 }),
      new Message({ sender: 'Victor', content: 'Can\'t wait!', time: 1731322860 }),
      new Message({ sender: 'Usuário', content: 'Excited!', time: 1731322920 })
    ],
    participants: 34,
    priority: 4,
    tags: []
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 7',
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    messages: [
      new Message({ sender: 'Xander', content: 'Game night at 8 PM', time: 1731354300 }),
      new Message({ sender: 'Yvonne', content: 'I\'ll be there!', time: 1731354360 }),
      new Message({ sender: 'Usuário', content: 'Count me in!', time: 1731354420 })
    ],
    participants: 22,
    priority: 4,
    tags: ['Tag 4']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 8',
    imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    messages: [
      new Message({ sender: 'Alice', content: 'Recipe for tonight?', time: 1731342000 }),
      new Message({ sender: 'Bob', content: 'I have a great one!', time: 1731342060 }),
      new Message({ sender: 'Usuário', content: 'Can\'t wait to try it!', time: 1731342120 })
    ],
    participants: 11,
    priority: 4,
    tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 9',
    imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    messages: [
      new Message({ sender: 'Dave', content: 'Exam prep session tomorrow', time: 1731330000 }),
      new Message({ sender: 'Eve', content: 'Let\'s do it!', time: 1731330060 }),
      new Message({ sender: 'Usuário', content: 'I will join!', time: 1731330120 })
    ],
    participants: 66,
    priority: 4
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 10',
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    messages: [
      new Message({ sender: 'Grace', content: 'Community meeting on Saturday', time: 1731321000 }),
      new Message({ sender: 'Heidi', content: 'I\'ll be there!', time: 1731321060 }),
      new Message({ sender: 'Usuário', content: 'Looking forward to it!', time: 1731321120 })
    ],
    participants: 15,
    priority: 4,
    tags: ['Tag 1', 'Tag 2', 'Tag 3']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 11',
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    messages: [
      new Message({ sender: 'Judy', content: 'Practice session at 5 PM', time: 1731339900 }),
      new Message({ sender: 'Mallory', content: 'Got it!', time: 1731339960 }),
      new Message({ sender: 'Usuário', content: 'I will be there!', time: 1731340020 })
    ],
    participants: 32,
    priority: 4,
    tags: ['Tag 1', 'Tag 2', 'Tag 3']
  }),
  new Group({
    whats_id: '',
    name: 'Raijin Copilot 12',
    imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    messages: [
      new Message({ sender: 'Olivia', content: 'Event planning at 3 PM', time: 1731326400 }),
      new Message({ sender: 'Peggy', content: 'Sounds good!', time: 1731326460 }),
      new Message({ sender: 'Usuário', content: 'I will join!', time: 1731326520 })
    ],
    participants: 12,
    priority: 4,
    tags: ['Tag 2', 'Tag 3']
  })
];
