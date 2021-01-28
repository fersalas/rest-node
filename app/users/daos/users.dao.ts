import shortid from 'shortid';
import debug from 'debug';

import { UsersDto } from '../dto/users.model';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    private static instance: UsersDao;
    users: Array<UsersDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    static getInstance(): UsersDao {
        if (!UsersDao.instance) {
            UsersDao.instance = new UsersDao();
        }
        return UsersDao.instance;
    }

    private getIndexById(userId: string) {
        const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
        return objIndex;
    }

    async addUser(user: UsersDto) {
        user.id = shortid.generate();
        this.users.push(user);

        return user.id;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: string) {
        return this.users.find((user: UsersDto) => user.id === userId);
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex((obj: { email: string }) => obj.email === email);
        const currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }

    async putUserById(user: UsersDto) {
        const objIndex = this.getIndexById(user.id);
        this.users.splice(objIndex, 1, user);

        return `${user.id} updated via PUT`;
    }

    async patchUserById(user: UsersDto) {
        const objIndex = this.getIndexById(user.id);
        const currentUser: UsersDto = this.users[objIndex];
        const allowedPatchFields = ['password', 'firstName', 'lastName', 'permissionLevel'];

        for (const field of allowedPatchFields) {
            if (field in user) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                currentUser[field] = user[field];
            }
        }

        this.users.splice(objIndex, 1, currentUser);

        return `${user.id} patched`;
    }

    async removeUserById(userId: string) {
        const objIndex = this.getIndexById(userId);
        this.users.splice(objIndex, 1);

        return `User with id: ${userId} removed`;
    }
}

export default UsersDao.getInstance();
