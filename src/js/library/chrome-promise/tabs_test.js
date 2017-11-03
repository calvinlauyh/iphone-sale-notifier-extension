import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';

import tabs from './tabs';

describe('tabs', () => {
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
    it('should call chrome.tabs.create()', () => {
      chrome.tabs.create.yields({});
      tabs.create({active: true});
      expect(chrome.tabs.create.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.create({active: true})).to.be.a('promise');
    });

    context('When the tab is created successfully', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.create.withArgs({active: true}).yields({active: true});
        return expect(tabs.create({active: true})).to.eventually.deep.equal({active: true});
      });
    });

    context('When the tab cannot be created', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.create.withArgs({active: true}).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.create({active: true})).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.executeScript()', () => {
    it('should call chrome.tabs.executeScript()', () => {
      chrome.tabs.executeScript.yields({});
      tabs.executeScript(1, {code: 'document.body'});
      expect(chrome.tabs.executeScript.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.executeScript(1, {code: '10'})).to.be.a('promise');
    });

    context('When the tab exists', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.executeScript.withArgs(1, {code: '10'}).yields([10]);
        return expect(tabs.executeScript(1, {code: '10'})).to.eventually.deep.equal([10]);
      });
    });

    context('When the tab does not exist', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.executeScript.withArgs(1, {code: '10'}).yields([10]);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.executeScript(1, {code: '10'})).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.get()', () => {
    it('should call chrome.tabs.get()', () => {
      chrome.tabs.get.yields({});
      tabs.get(1);
      expect(chrome.tabs.get.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.get(1)).to.be.a('promise');
    });

    context('When the tab exists', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.get.withArgs(1).yields({tabId: 1});
        return expect(tabs.get(1)).to.eventually.deep.equal({tabId: 1});
      });
    });

    context('When the tab does not exist', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.get.withArgs(1).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.get(1)).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.query()', () => {
    it('should call chrome.tabs.query()', () => {
      chrome.tabs.query.yields({});
      tabs.query({tabId: 1});
      expect(chrome.tabs.query.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.query({tabId: 1})).to.be.a('promise');
    });

    context('When the tab exists', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.query.withArgs({tabId: 1}).yields({tabId: 1});
        return expect(tabs.query({tabId: 1})).to.eventually.deep.equal({tabId: 1});
      });
    });

    context('When the tab does not exist', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.query.withArgs({tabId: 1}).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.query({tabId: 1})).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.remove()', () => {
    it('should call chrome.tabs.remove()', () => {
      chrome.tabs.remove.yields(undefined);
      tabs.remove(1);
      expect(chrome.tabs.remove.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.remove(1)).to.be.a('promise');
    });

    context('When the tab exists', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.remove.withArgs(1).yields(undefined);
        return expect(tabs.remove(1)).to.be.fulfilled;
      });
    });

    context('When the tab does not exist', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.remove.withArgs(1).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.remove(1)).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  describe('.update()', () => {
    it('should call chrome.tabs.update()', () => {
      chrome.tabs.update.yields({id: 1});
      tabs.update(1, {active: true});
      expect(chrome.tabs.update.calledOnce).to.be.true;
    });

    it('should return a promise', () => {
      expect(tabs.update(1, {active: true})).to.be.a('promise');
    });

    context('When the tab is updated', () => {
      it('should return a resolved promise', () => {
        chrome.tabs.update.withArgs(1, {active: true}).yields({id: 1});
        return expect(tabs.update(1, {active: true})).to.eventually.deep.equal({id: 1});
      });
    });

    context('When the tab cannot be updated', () => {
      it('should return a rejected promise', () => {
        chrome.tabs.update.withArgs(1, {active: true}).yields(undefined);
        chrome.runtime.lastError = new Error('error');
        return expect(tabs.update(1, {active: true})).to.be.rejectedWith(Error, 'error');
      });
    });
  });

  after(() => {
    global.chrome = origChrome;
  });
});