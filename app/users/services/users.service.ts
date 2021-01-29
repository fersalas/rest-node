import { CRUD } from '../../common/interfaces/crud.interface';
import usersDao from '../daos/users.dao';
import { UsersDto } from '../dto/users.model';

class UsersService implements CRUD {
  private static instance: UsersService;

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }

  async create(resource: UsersDto) {
    console.log(resource);
    console.log(usersDao);
    return await usersDao.addUser(resource);
  }

  async deleteById(resourceId: string) {
    return usersDao.removeUserById(resourceId);
  }

  async list(limit: number, page: number) {
    // limit and page are ignored until we upgrade our DAO
    return await usersDao.getUsers(limit, page);
  }

  async patchById(userId: string, resource: UsersDto): Promise<any> {
    return usersDao.patchUserById(userId, resource);
  }

  async readById(resourceId: string) {
    return await usersDao.getUserById(resourceId);
  }

  async updateById(userId: string, resource: UsersDto): Promise<any> {
    return await usersDao.patchUserById(userId, resource);
  }

  async getUserByEmail(email: string) {
    return usersDao.getUserByEmail(email);
  }
}

export default UsersService.getInstance();
