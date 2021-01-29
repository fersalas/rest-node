import * as shortUUID from 'shortid';
import debug from 'debug';

import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  private static instance: UsersDao;

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema({
    _id: String,
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    permissionLevel: Number
  });

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  public static getInstance(): UsersDao {
    if (!this.instance) {
      this.instance = new UsersDao();
    }
    return this.instance;
  }

  async addUser(userFields: any) {
    userFields._id = shortUUID.generate();
    const user = new this.User(userFields);
    await user.save();

    return userFields._id;
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).populate('User', '-password');
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email });
  }

  async patchUserById(userId: string, userFields: any) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    if (!existingUser) {
      throw new Error(`User not id: ${userId}found`);
    }
    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId });
  }
}

export default UsersDao.getInstance();
