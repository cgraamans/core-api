import chai from 'chai';
import chaiHttp from 'chai-http';
import { serverConfig } from '../src/config/server.config';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Access test - all access',() =>{

    it('should return a string from all access without credentials', ()=>{

        chai.request(`http://localhost:${serverConfig.port}`)
        .get(`/${serverConfig.apiVersion}/test/all/`)
        .then(function(res) {
            expect(res.text).to.equal("Public Content.");
        });
    
    });

});


describe('Access test - restricted access by unauthorized user',() =>{

    it('should return a 403 error and a body message stating token missing', ()=>{

        chai.request(`http://localhost:${serverConfig.port}`)
        .get(`/${serverConfig.apiVersion}/test/user/`)
        .then(function(res) {
            expect(res).status(403);
            expect(res.body.message).to.be.string(`No token provided!`)
        });
    
    });

});

describe('Access test - allowed access by user', () => {

    const name = Math.random().toString();
    const email = Math.random().toString()+"@gmail.com";
    const password = Math.random().toString();

    it('should have status 200 and return test content', ()=>{
  
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

                    chai.request(`http://localhost:${serverConfig.port}`)
                    .get(`/${serverConfig.apiVersion}/test/user/`)
                    .set('x-access-token',res.body.accessToken)
                    .then(function(accessRes) {
                        expect(accessRes).to.have.status(200);
                        expect(accessRes.text).to.equal("User Content.");
                    });

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