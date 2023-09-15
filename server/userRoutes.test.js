import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserModel } from '../server/src/models/Users.js'; // 导入你的模型
import bcrypt from "bcrypt";
import app from '../server/src/index.js'; // 导入你的Express应用
import mongoose from "mongoose";

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      // 如果没有活动的数据库连接，才连接到数据库
      await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      // 如果有活动的数据库连接，才断开连接
      await mongoose.disconnect();
    }
  });

  beforeEach(async () => {
    // 在每个测试用例之前清除数据库中的数据
    await UserModel.deleteMany({});
  });

  it('should register a new user', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
    };

    const res = await chai.request(app)
      .post('/auth/register')
      .send(user);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('User registered successfully');
  });

  it('should log in a registered user', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建一个测试用户并保存到数据库
    await new UserModel({ username, password: hashedPassword }).save();

    const res = await chai.request(app)
      .post('/auth/login')
      .send({ username, password });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('userID');
  });
});
