import { USERS } from './users';

export const POSTS = [
    { 
        imageUrl: "https://i.ibb.co/182bP1y/4k.png" ,
        user: USERS[0].user,
        likes: 7870,
        caption: 'Train ride to Hogwarts. 😂🥶 This is going to be a fun build' ,
        profile_picture: USERS[0].image ,
        comment: [
            {
                user: 'theQazman',
                comment: 'Oh! this build is amazing, I am super exited about it',
            },
            {
                user: 'amaanath.dev',
                comment: "Once I wake up i finally will be ready to code this up",
            }
        ]
    },
    { 
        imageUrl: "https://i.ibb.co/182bP1y/4k.png" ,
        user: USERS[1].user,
        likes: 3500,
        caption: 'Train ride to Hogwarts. 😂🥶 ' ,
        profile_picture: USERS[1].image ,
        comment: [
            {
                user: 'cleverQazi',
                comment: 'Oh! this build is amazing, I am super exited about it',
            },
            {
                user: 'amaanath.dev',
                comment: "I am sleeping",
            }
        ]
    },
]