import { expect } from 'chai';
import UserService from '../../src/services/user.service';
import NotesLabel from '../../src/services/notes.service';
import {
  superUser,
  superUserLogin,
  updateSuperUser,
  updateSuperUserPass
} from '../integration/user-note';
import AuthService from '../../src/services/auth.service';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
const userObj = {
  firstName: 'abc1',
  lastName: 'xyz1',
  email: 'abc1@gmail.com',
  mobile: 8997896623,
  password: 'nic11',
  gender: 'male',
  dob: '1998-08-20'
};
const updatePassword = {
  email: 'mark42@gmail.com',
  req: '',
  next: ''
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

dotenv.config();

describe('User', () => {
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
  // Register
  describe('Register User', () => {
    it('register a user', async () => {
      const data = await new UserService().newUser(superUser as any);
      expect(data).to.be.an('object');
    });
  });
  // Login
  describe('Login User', () => {
    it('LoggedIn User', async () => {
      const result = await new AuthService().login(superUserLogin as any);
      expect(result).to.be.an('object');
    });
  });
  // reset
  describe('Forget password', () => {
    it('Forgot  password', async () => {
      const result = await new AuthService().forgotpassword(
        updatePassword.email as any,
        updatePassword.req as any,
        updatePassword.next as any
      );
      expect(result).to.be.an('object');
    });
  });
  /*   let token = '';
    it("Forget user", async () => {
            const data = await new UserService().forgetUser({"email": "abc6@gmail.com"});
            token = data;
            console.log(data);
            expect(data).to.be.an('string');
        }) 

       it("Reset user", async () => {
            const data = await new UserService().reset(6, updateSuperUserPass.password);
            console.log(data);
            expect(data).to.be.an('array');
        }) */

  //corret reset
  // describe('Register', () => {
  //   it('should return a user object on successful registration', (done) => {
  //     const userData = {
  //       username: 'testuser',
  //       email: 'testuser@example.com',
  //       password: 'testpassword',
  //       confirmPassword: 'testpassword'
  //     };
  //     register(userData, (err, user) => {
  //       expect(err).to.be.null;
  //       expect(user).to.be.an('object');
  //       expect(user.username).to.equal(userData.username);
  //       expect(user.email).to.equal(userData.email);
  //       done();
  //     });
  //   });

  //   it('should return an error on duplicate username', (done) => {
  //     const userData = {
  //       username: 'existinguser',
  //       email: 'testuser@example.com',
  //       password: 'testpassword',
  //       confirmPassword: 'testpassword'
  //     };
  //     register(userData, (err, user) => {
  //       expect(err).to.be.an('error');
  //       expect(user).to.be.null;
  //       done();
  //     });
  //   });

  //   it('should return an error on invalid email', (done) => {
  //     const userData = {
  //       username: 'testuser',
  //       email: 'invalidemail',
  //       password: 'testpassword',
  //       confirmPassword: 'testpassword'
  //     };
  //     register(userData, (err, user) => {
  //       expect(err).to.be.an('error');
  //       expect(user).to.be.null;
  //       done();
  //     });
  //   });

  //   it('should return an error on mismatched passwords', (done) => {
  //     const userData = {
  //       username: 'testuser',
  //       email: 'testuser@example.com',
  //       password: 'testpassword',
  //       confirmPassword: 'wrongpassword'
  //     };
  //     register(userData, (err, user) => {
  //       expect(err).to.be.an('error');
  //       expect(user).to.be.null;
  //       done();
  //     });
  //   });
});
