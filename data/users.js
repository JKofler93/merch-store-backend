import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin Jz',
        email: 'jz@admin.com',
        password: bcrypt.hashSync('123456abc', 10),
        isAdmin: true
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
    }
]

export default users;