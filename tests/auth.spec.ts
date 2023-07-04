import chai from 'chai';
import chaiHttp from 'chai-http';
// import chaiJson from 'chai-json';
import { serverConfig } from '../src/config/server.config';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('AUTH SignUp - Duplicate Username', () => {

  const name = Math.random().toString();
  const email = Math.random().toString()+"@gmail.com";
  const password = Math.random().toString();

  it('should have error 409 and message bad username', ()=>{

    const path = `/${serverConfig.apiVersion}/auth/signup/`;

    chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
            password:password,
            email:email
        })
        .then(function (res) {

            return chai.request(`http://localhost:${serverConfig.port}`)
                .post(path)
                .send({
                username:name,
                password:password,
                email:email
                })
                .then(function (res) {
                    expect(res).to.have.status(409);
                    expect(res).to.be.json;
                    expect(res.body).to.eql({error: "Username is already in use"});
                });

        })
        .catch(function (err) {
            throw err;
        });

  });

});

describe('AUTH SignUp - Duplicate Email', () => {

    const name = Math.random().toString();
    const email = Math.random().toString()+"@gmail.com";
    const password = Math.random().toString();
  
    it('should have error 409 and message bad email', ()=>{
  
      const path = `/${serverConfig.apiVersion}/auth/signup/`;
  
      chai.request(`http://localhost:${serverConfig.port}`)
          .post(path)
          .send({
              username:name,
              password:password,
              email:email
          })
          .then(function () {
  
              return chai.request(`http://localhost:${serverConfig.port}`)
                  .post(path)
                  .send({
                  username:Math.random().toString(),
                  password:password,
                  email:email
                  })
                  .then(function (res) {
                      expect(res).to.have.status(409);
                      expect(res).to.be.json;
                      expect(res.body).to.eql({error: "Email is already in use"});
                  });
  
          })
          .catch(function (err) {
              throw err;
          });
  
    });
  
});

describe('AUTH SignUp - Bad Email', () => {

    const name = Math.random().toString();
    const email = Math.random().toString();
    const password = Math.random().toString();
  
    it('should have error 409 and message invalid email', ()=>{
  
      const path = `/${serverConfig.apiVersion}/auth/signup/`;
  
      chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
            password:password,
            email:email
        })
        .then(function (res) {
            expect(res).to.have.status(409);
            expect(res).to.be.json;
            expect(res.body).to.eql({error: "Not a valid email address"});
        })
        .catch(function (err) {
            throw err;
        });
  
    });
  
});

describe('AUTH SignUp - Success', () => {

    const name = Math.random().toString();
    const email = Math.random().toString()+"@gmail.com";
    const password = Math.random().toString();
  
    it('should have status 200 and message success', ()=>{
  
      const path = `/${serverConfig.apiVersion}/auth/signup/`;
  
      return chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
            password:password,
            email:email
        })
        .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.eql({message: "User was registered successfully!"});
        })
        .catch(function (err) {
            throw err;
        });
  
    });
  
});

describe('AUTH isUser - True', () => {

    const name = Math.random().toString();
    const email = Math.random().toString()+"@gmail.com";
    const password = Math.random().toString();
    
    it('should have status 200 and message true', ()=>{

        const path = `/${serverConfig.apiVersion}/auth/signup/`;
 
        chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
            password:password,
            email:email
        })
        .then(function () {
  
            return chai.request(`http://localhost:${serverConfig.port}`)
                .post(`/${serverConfig.apiVersion}/auth/isUser/`)
                .send({
                    username:name,
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.eql({message: true});
                })
                .catch(function (err) {
                    throw err;
                });

        })
        .catch(function (err) {
            throw err;
        });

  
    });
  
});

describe('AUTH isUser - False', () => {

    const name = Math.random().toString();
  
    it('should have status 200 and message false', ()=>{
  
      const path = `/${serverConfig.apiVersion}/auth/isUser/`;
  
      chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
        })
        .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.eql({message: false});
        })
        .catch(function (err) {
            throw err;
        });
  
    });
  
});

describe('AUTH SignIn - Fail', () => {

    const name = Math.random().toString();
    const password = Math.random().toString();

    it('should have status 401 and error invalid username or password', ()=>{
  
      const path = `/${serverConfig.apiVersion}/auth/signin/`;
  
      chai.request(`http://localhost:${serverConfig.port}`)
        .post(path)
        .send({
            username:name,
            password:password
        })
        .then(function (res) {
            expect(res).to.have.status(401);
            expect(res).to.be.json;
            expect(res.body).to.eql({error: "Invalid username or password"});
        })
        .catch(function (err) {
            throw err;
        });
  
    });
  
});

describe('AUTH SignIn - Success', () => {

    const name = Math.random().toString();
    const email = Math.random().toString()+"@gmail.com";
    const password = Math.random().toString();

    it('should have status 200 and return user object', ()=>{
  
        chai.request(`http://localhost:${serverConfig.port}`)
        .post(`/${serverConfig.apiVersion}/auth/signup/`)
        .send({
            username:name,
            password:password,
            email:email
        })
        .then(function () {
  
             return chai.request(`http://localhost:${serverConfig.port}`)
                .post(`/${serverConfig.apiVersion}/auth/signin/`)
                .send({
                    username:name,
                    password:password
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.all.keys(["id","username","email","roles","accessToken"]);
                })
                .catch(function (err) {
                    throw err;
                });
        })
        .catch(function (err) {
            throw err;
        });
    });
  
});

// describe('AUTH SignIn - Success', () => {

//     const name = Math.random().toString();
  
//     it('should have status 200 and message false', ()=>{
  
//       const path = `/${serverConfig.apiVersion}/auth/isUser/`;
  
//       chai.request(`http://localhost:${serverConfig.port}`)
//         .post(path)
//         .send({
//             username:name,
//         })
//         .then(function (res) {
//             expect(res).to.have.status(200);
//             expect(res).to.be.json;
//             expect(res.body).to.eql({message: false});
//         })
//         .catch(function (err) {
//             throw err;
//         });
  
//     });
  
// });