import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';

import local from './local';

describe('stoarge.local', () => {
  let origChrome;
  before(() => {
    origChrome = global.chrome;
    global.chrome = chrome;
  });
  beforeEach(() => {
    chrome.storage.local.get.flush();
    chrome.runtime.lastError = null;
  });

  describe('.get()', () => {
    it('should call chrome.storage.local.get()', () => {
      chrome.storage.local.get.yields({});
      local.get('key');
      expect(chrome.storage.local.get.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(local.get('key')).to.be.a('promise');
    });

    context('When the item exists', () => {
      it('should return a resolved promise', () => {
        chrome.storage.local.get.withArgs('key').yields({key: 'value'});
        return expect(local.get('key')).to.eventually.deep.equal({key: 'value'});
      });
    });

    context('When the item does not exist', () => {
      it('should return a rejected promise', () => {
        chrome.storage.local.get.withArgs('key').yields({});
        chrome.runtime.lastError = new Error('error');
        return expect(local.get('key')).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.set()', () => {
    it('should call chrome.storage.local.set()', () => {
      chrome.storage.local.set.yields(undefined);
      local.set({key: 'value'});
      expect(chrome.storage.local.set.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(local.set({key: 'value'})).to.be.a('promise');
    });

    context('When the items are set successfully', () => {
      it('should return a resolved promise', () => {
        chrome.storage.local.get.withArgs({key: 'value'}).yields(undefined);
        return expect(local.set({key: 'value'})).to.be.fulfilled;
      });
    });

    context('When the items cannot be set', () => {
      it('should return a rejected promise', () => {
        chrome.storage.local.get.withArgs({key: 'value'}).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(local.set({key: 'value'})).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  after(() => {
    global.chrome = origChrome;
  });
});