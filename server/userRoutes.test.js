import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserModel } from '../server/src/models/Users.js'; // Import model
import bcrypt from "bcrypt";
import app from '../server/src/index.js'; // Import Express application
import mongoose from "mongoose";

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      // Connect to the database only if there is no active database connection
      await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      // Disconnect from the database only if there is an active database connection
      await mongoose.disconnect();
    }
  });

  beforeEach(async () => {
    // Clear data from the database before each test case
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

    // Create a test user and save it to the database
    await new UserModel({ username, password: hashedPassword }).save();

    const res = await chai.request(app)
      .post('/auth/login')
      .send({ username, password });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('userID');
  });
});
