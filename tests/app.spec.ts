import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import { serverConfig } from '../src/config/server.config';

chai.use(chaiHttp);
const expect = chai.expect;

describe('API ping request', () => {
  it('should return response on call', () => {
    return chai.request(`http://localhost:${serverConfig.port}`).get(`/`)
      .then(res => {
        expect(res).to.have.status(200);
      })
  })
});
