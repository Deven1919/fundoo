import { expect, should } from 'chai';

import { superUser, superUserLogin, updateSuperUser } from './user-note';

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
const userObj = {
  firstName: 'abc1',
  lastName: 'xyz1',
  email: 'abc1@gmail.com',
  mobile: 8997896623,
  password: 'nic11',
  gender: 'male',
  dob: '1998-08-20'
};

const updateUserObj = {
  firstName: 'abc9',
  lastName: 'xyz9',
  email: 'abc9@gmail.com',
  password: 'nic99'
};

const noteObj = {
  title: 'never finish',
  description: 'in the silence',
  color: 'white',
  archive: 'false',
  trash: 'false',
  createdBy: 9
};

const updateNoteObj = {
  description: 'JS jai bhavani jai shivaji',
  color: 'white'
};

const updateSuperUserPass = {
  password: 'nic77'
};

let token = '';
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST as string);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Register User', () => {
    it('Registration of user', (done) => {
      request(app.getApp())
        .post('/api/register')
        .send(superUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  describe('Login A User', () => {
    it('Login Of User', (done) => {
      request(app.getApp())
        .get('/api/login')
        .send({
          email: superUserLogin.email,
          password: superUserLogin.password
        })
        .end((err, res) => {
          token = 'Bearer ' + res.body.token;

          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  describe('Forgot password', () => {
    it('Sending mail to users', (done) => {
      request(app.getApp())
        .get(`/api/forgotpassword`)
        .send(updateSuperUserPass)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });

  // Get all users
  // describe('GET ALL USER', () => {
  //   it('should return array of users', (done) => {
  //     request(app.getApp())
  //       .get('/api/getAllUser')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });

  // // get all notes
  // describe('GET ALL NOTES', () => {
  //   it('should return array of notes', (done) => {
  //     request(app.getApp())
  //       .get('/api/getAllNotes')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });
  // // // create User

  // describe('create User', () => {
  //   it('return object', (done) => {
  //     request(app.getApp()).post('/api/register');
  //     // .end((err, res) => {
  //     //   expect(res.statusCode).to.be.equal(201);
  //     //   res.body.data.should.to.be('string');
  //     //   expect(res.body).to.be.a('string');
  //     done();
  //     // });
  //   });
  // });
  // // // // login
  // describe('login', () => {
  //   it('login user', (done) => {
  //     request(app.getApp()).get('/api/login');
  //     // .end((err, res) => {
  //     //   expect(res.statusCode).to.be.equal(200);

  //     // });

  //     done();
  //   });
});
