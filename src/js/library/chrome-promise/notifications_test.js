import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';

import notifications from './notifications';

describe('notifications', () => {
  let origChrome;
  before(() => {
    origChrome = global.chrome;
    global.chrome = chrome;
  });
  beforeEach(() => {
    chrome.flush();
    chrome.runtime.lastError = null;
  });

  describe('.create()', () => {
    it('should call chrome.notifications.create()', () => {
      chrome.notifications.create.yields('notify');
      notifications.create('notify', {type: 'basic'});
      expect(chrome.notifications.create.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(notifications.create('notify', {type: 'basic'})).to.be.a('promise');
    });

    context('When the notification is created successfully', () => {
      it('should return a resolved promise', () => {
        chrome.notifications.create.withArgs('notify', {type: 'basic'}).yields('notification');
        return expect(
          notifications.create('notify', {type: 'basic'})
        ).to.eventually.deep.equal('notification');
      });
    });

    context('When the notificaiton cannot be created', () => {
      it('should return a rejected promise', () => {
        chrome.notifications.create.withArgs('notify', {type: 'basic'}).yields('notify');
        chrome.runtime.lastError = new Error('error');
        return expect(
          notifications.create('notify', {type: 'basic'})
        ).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  after(() => {
    global.chrome = origChrome;
  });
});