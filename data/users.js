import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Jz Timm',
        email: 'jz@email.com',
        password: bcrypt.hashSync('123456abc', 10)
    },
    {
        name: 'Alex Smith',
        email: 'alexsmith@email.com',
        password: bcrypt.hashSync('123456abc', 10)
    },
    {
        name: 'John Smith',
        email: 'johnsmith@email.com',
        password: bcrypt.hashSync('123456abc', 10)
    },
    {
        name: 'Joe Kofler',
        email: 'joek@email.com',
        password: bcrypt.hashSync('123456abc', 10)
    }
];

export default users;