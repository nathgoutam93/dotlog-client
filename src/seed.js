//Database collections
export const Users = [
  {
    userId: '1',
    username: 'Gautam93',
    fullName: 'Gautam nath',
    imgSrc: '/images/gautam.jpg',
    about:
      'full-stack webdev | self-taught devloper | constantly keeping my learning curve upward',
    interests: ['web development', 'programming'],
    following: ['2', '3'],
    followers: ['2'],
    projects: [
      {
        projectId: '1',
        projectName: 'Chrome extension',
        imgSrc: '/images/in-fo-nt.png',
      },
      {
        projectId: '2',
        projectName: 'Monalisa',
        imgSrc: '/images/monalisa.jpg',
      },
      {
        projectId: '3',
        projectName: 'HelloWorld!',
        imgSrc: '/images/hello.jpg',
      },
    ],
    posts: ['1'],
    chats: [],
    dateCreated: 1634390533585,
  },
  {
    userId: '2',
    username: 'khanin',
    fullName: 'Khanin Nath',
    imgSrc: '/images/khanin.jpg',
    about: 'painter',
    interests: ['painting'],
    following: ['1'],
    followers: ['1', '3'],
    projects: [
      {
        projectId: '1',
        projectName: 'Chrome extension',
        imgSrc: '/images/in-fo-nt.png',
      },
      {
        projectId: '2',
        projectName: 'Monalisa',
        imgSrc: '/images/monalisa.jpg',
      },
      {
        projectId: '3',
        projectName: 'HelloWorld!',
        imgSrc: '/images/hello.jpg',
      },
    ],
    posts: ['2'],
    chats: [],
    dateCreated: 1634390533585,
  },
  {
    userId: '3',
    username: 'Neha21',
    fullName: 'Neha nath',
    imgSrc: '/images/profile.jpg',
    about: 'student',
    interests: ['social media'],
    following: ['2'],
    followers: ['1'],
    projects: [
      {
        projectId: '2',
        projectName: 'Monalisa',
        imgSrc: '/images/monalisa.jpg',
      },
      {
        projectId: '3',
        projectName: 'HelloWorld!',
        imgSrc: '/images/hello.jpg',
      },
    ],
    posts: ['3', '4'],
    chats: [],
    dateCreated: 1634390533585,
  },
];

export const Projects = [
  {
    projectId: '1',
    projectName: 'Chrome extension',
    imgSrc: '/images/in-fo-nt.png',
    createdBy: '1',
    about: 'a chrome extension to help people get font information',
    status: 'Complete',
    posts: ['1'],
    followers: ['2'],
    dateCreated: 1634390533585,
  },
  {
    projectId: '2',
    projectName: 'Monalisa',
    imgSrc: '/images/monalisa.jpg',
    createdBy: '2',
    about: 'it is drawing of monalisa by da vinci',
    status: 'WIP',
    posts: ['2'],
    followers: ['3', '1'],
    dateCreated: 1634748801599,
  },
  {
    projectId: '3',
    projectName: 'HelloWorld!',
    imgSrc: '/images/hello.jpg',
    createdBy: '1',
    about: 'this a social media project where people can share their progress',
    status: 'WIP',
    posts: ['3'],
    followers: ['3', '2'],
    dateCreated: 1634747329316,
  },
];

export const Posts = [
  {
    postId: '1',
    userId: '1',
    caption: 'hello everyone!',
    imgSrc: '/images/000-Online-Code-Editors.png',
    likes: ['2'],
    commments: [
      {
        userId: '2',
        comment: 'how are you man',
      },
    ],
    shares: [],
    dateCreated: 1634747329316,
  },
  {
    postId: '2',
    userId: '2',
    caption: 'looking forward to start a home tutorial centre',
    imgSrc: '/images/home.jpg',
    likes: ['1', '3'],
    commments: [
      {
        userId: '1',
        comment: 'great idea bro',
      },
      {
        userId: '3',
        comment: 'good initiative',
      },
    ],
    shares: ['1', '3'],
    dateCreated: 1634747329316,
  },
  {
    postId: '3',
    userId: '3',
    caption: 'hey everyone is all good',
    imgSrc: '/images/neha.jpg',
    likes: ['1', '2', '3'],
    commments: [
      {
        userId: '2',
        comment: 'yeah! cant complain',
      },
    ],
    shares: [],
    dateCreated: 1634747329316,
  },
  {
    postId: '4',
    userId: '3',
    caption: 'ok enough for today, see ya all tommorow',
    imgSrc: '/images/bye.jpg',
    likes: ['1', '2'],
    commments: [
      {
        userId: '2',
        comment: 'see ya',
      },
    ],
    shares: [],
    dateCreated: 1634747329316,
  },
];

export const ProjectPosts = [
  {
    postId: '1',
    projectId: '1',
    userId: '1',
    projectName: 'Chrome extension',
    projectImg: '/images/in-fo-nt.png',
    username: 'Gautam93',
    userImg: '/images/gautam.jpg',
    caption: 'yay! finally its complete, looking forward to publish it',
    imgSrc: '/images/extension.png',
    likes: ['1'],
    commments: [
      {
        userId: '2',
        comment: 'congrats',
      },
      {
        userId: '3',
        comment: 'congrats dada',
      },
    ],
    shares: [],
    dateCreated: 1634747329316,
  },
  {
    postId: '2',
    projectId: '2',
    userId: '2',
    projectName: 'Monalisa',
    projectImg: '/images/monalisa.jpg',
    username: 'khanin',
    userImg: '/images/khanin.jpg',
    caption: 'started working on this this new project',
    imgSrc: '/images/mona.jpg',
    likes: ['2', '3'],
    commments: [
      {
        userId: '1',
        comment: 'looking good',
      },
    ],
    shares: [],
    dateCreated: 1634747329316,
  },
  {
    postId: '3',
    projectId: '3',
    userId: '1',
    projectName: 'HelloWorld!',
    projectImg: '/images/hello.jpg',
    username: 'Gautam93',
    userImg: '/images/gautam.jpg',
    caption: 'started a this new project as a start up',
    imgSrc: '/images/hello.png',
    likes: ['3'],
    commments: [
      {
        userId: '2',
        comment: "can't wait",
      },
    ],
    shares: ['2'],
    dateCreated: 1634747329316,
  },
];

export const chats = [
  {
    chatId: '',
    Messages: [
      {
        userId: '',
        message: '',
        time: '',
      },
      {
        userId: '',
        message: '',
        time: '',
      },
    ],
  },
  {
    chatId: '',
    Messages: [
      {
        userId: '',
        message: '',
        time: '',
      },
      {
        userId: '',
        message: '',
        time: '',
      },
      {
        userId: '',
        message: '',
        time: '',
      },
    ],
  },
  {
    chatId: '',
    Messages: [
      {
        userId: '',
        message: '',
        time: '',
      },
    ],
  },
];
