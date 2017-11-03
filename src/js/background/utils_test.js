import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';
import rewire from 'rewire';

describe('utils', () => {
  let utils;
  let origChrome;
  before(() => {
    origChrome = global.chrome;
    global.chrome = chrome;
    chrome.runtime.id = 'extension';
    utils = rewire('./utils');
  });

  describe('-findWorkerTabsByWorkerPage', () => {
    let findWorkerTabsByWorkerPage;
    before(() => {
      findWorkerTabsByWorkerPage = utils.__get__('findWorkerTabsByWorkerPage');
    });
    beforeEach(() => {
      chrome.flush();
      chrome.runtime.id = 'extension';
      chrome.runtime.lastError = null;
    });

    it('should query tabs with the worker tab url', async () => {
      const tabsQueryMock = chrome.tabs.query.withArgs({
        url: 'chrome-extension://extension/worker.html*'
      }).yields([{id: 1}]);
      await findWorkerTabsByWorkerPage();
      expect(tabsQueryMock.calledOnce).to.be.true;
    });

    context('When there is no tab opening the worker page', () => {
      it('should return an empty array', () => {
        chrome.tabs.query.withArgs({
          url: 'chrome-extension://extension/worker.html*'
        }).yields([]);
        return expect(
          findWorkerTabsByWorkerPage()
        ).to.eventually.deep.equal([]);
      });
    });

    context('When there is a tab opening the worker page', () => {
      it('should return an array containing the tab', () => {
        chrome.tabs.query.withArgs({
          url: 'chrome-extension://extension/worker.html*'
        }).yields([{id: 1}]);
        return expect(
          findWorkerTabsByWorkerPage()
        ).to.eventually.deep.equal([{id: 1}]);
      });
    });

    context('When there are multiple tabs opening the worker page', () => {
      it('should return an array containing all the matched tabs', () => {
        chrome.tabs.query.withArgs({
          url: 'chrome-extension://extension/worker.html*'
        }).yields([{id: 2}, {id: 1}]);
        return expect(
          findWorkerTabsByWorkerPage()
        ).to.eventually.deep.equal([{id: 2}, {id: 1}]);
      });
    });
  });

  describe('-findWorkerTabsByAppleSite', () => {
    let findWorkerTabsByAppleSite;
    before(() => {
      findWorkerTabsByAppleSite = utils.__get__('findWorkerTabsByAppleSite');
    });
    beforeEach(() => {
      chrome.flush();
      chrome.runtime.id = 'extension';
      chrome.runtime.lastError = null;
    });

    it('should query tabs with the Apple website', async () => {
      const tabsQueryMock = chrome.tabs.query.withArgs({
        url: 'https://www.apple.com/*'
      });
      tabsQueryMock.yields([]);
      try {
        await findWorkerTabsByAppleSite();
      } catch(e) {/*safely ignore the error*/}
      expect(tabsQueryMock.calledOnce).to.be.true;
    });

    context('When there is no tabs opening Apple website', () => {
      it('should return an empty array', () => {
        chrome.tabs.query.withArgs({
          url: 'https://www.apple.com/*'
        }).yields([]);
        return expect(findWorkerTabsByAppleSite()).to.eventually.deep.equal([]);
      });
    });

    context('When there is a tab opening Apple website', () => {
      it('should execute script on it to examine its document.referrer', async () => {
        chrome.tabs.query.withArgs({
          url: 'https://www.apple.com/*'
        }).yields([{id: 1}]);
        const tabsExecMock = chrome.tabs.executeScript.withArgs(
          1, {code: 'document.referrer'}
        ).yields(['chrome-extension://extension/worker.html']);
        await findWorkerTabsByAppleSite();
        expect(tabsExecMock.calledOnce).to.be.true;
      });
    });

    context('Given there are multiples tabs opening Apple website', () => {
      context('When one the tab is the worker tab', () => {
        it('should execute script on all the tabs to determine if it is a worker tab',
          async () =>
        {
          chrome.tabs.query.withArgs({
            url: 'https://www.apple.com/*'
          }).yields([{id: 1}, {id: 2}, {id: 3}]);
          const mock = chrome.tabs.executeScript
          const tabsExecMock1 = mock.withArgs(1, {code: 'document.referrer'}).yields(['chrome']);
          const tabsExecMock2 = mock.withArgs(2, {code: 'document.referrer'}).yields(
            ['chrome-extension://extension/worker.html']
          );
          const tabsExecMock3 = mock.withArgs(3, {code: 'document.referrer'}).yields(['skipped']);
          await findWorkerTabsByAppleSite();

          expect(tabsExecMock1.calledOnce).to.be.true;
          expect(tabsExecMock2.calledOnce).to.be.true;
          expect(tabsExecMock3.calledOnce).to.be.true;
        });

        it('should return an array containing the worker tab', () => {
          chrome.tabs.query.withArgs({
            url: 'https://www.apple.com/*'
          }).yields([{id: 1}, {id: 2}, {id: 3}]);
          chrome.tabs.executeScript.withArgs(
            1, {code: 'document.referrer'}
          ).yields(['chrome']);
          chrome.tabs.executeScript.withArgs(
            2, {code: 'document.referrer'}
          ).yields(['chrome-extension://extension/worker.html']);
          chrome.tabs.executeScript.withArgs(
            3, {code: 'document.referrer'}
          ).yields(['chrome']);
          return expect(findWorkerTabsByAppleSite()).to.eventually.deep.equal([{id: 2}]);
        })
      });

      context('When none of the tabs is worker tab', () => {
        it('should execute script on all the tabs to determine if it is a worker tab', async () => {
          chrome.tabs.query.withArgs({
            url: 'https://www.apple.com/*'
          }).yields([{id: 1}, {id: 2}, {id: 3}]);
          chrome.tabs.executeScript.yields(['chrome']);
          try {
            await findWorkerTabsByAppleSite();
          } catch(e) {/*safely ignore the error*/}

          const spy = chrome.tabs.executeScript;
          expect(spy.withArgs(1, {code: 'document.referrer'}).calledOnce).to.be.true;
          expect(spy.withArgs(2, {code: 'document.referrer'}).calledOnce).to.be.true;
          expect(spy.withArgs(3, {code: 'document.referrer'}).calledOnce).to.be.true;
        });

        it('should return an empty array', () => {
          chrome.tabs.query.withArgs({
            url: 'https://www.apple.com/*'
          }).yields([{id: 1}, {id: 2}]);
          chrome.tabs.executeScript.yields(['chrome']);
          return expect(findWorkerTabsByAppleSite()).to.eventually.deep.equal([]);
        });
      });
    });
  });

  describe('-findAllWorkerTabs()', () => {
    let findAllWorkerTabs;
    before(() => {
      findAllWorkerTabs = utils.__get__('findAllWorkerTabs');
    });
    beforeEach(() => {
      chrome.flush();
      chrome.runtime.id = 'extension';
      chrome.runtime.lastError = null;
    });

    it('should reutrn merged array of worker tabs opening worker page and Apple site', () => {
      chrome.tabs.query.withArgs({
        url: 'chrome-extension://extension/worker.html*'
      }).yields([{id: 1}, {id: 2}]);
      chrome.tabs.query.withArgs({
        url: 'https://www.apple.com/*'
      }).yields([{id: 3}, {id: 4}]);
      chrome.tabs.executeScript.yields(['chrome-extension://extension/worker.html']);
      return expect(findAllWorkerTabs()).to.eventually.deep.equal([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
    });
  });

  describe('-closeAllWorkerTabs()', () => {
    let origFindAllWorkerTabs;
    let closeAllWorkerTabs;
    before(() => {
      origFindAllWorkerTabs = utils.__get__('findAllWorkerTabs');
      closeAllWorkerTabs = utils.__get__('closeAllWorkerTabs');
    });
    beforeEach(() => {
      chrome.flush();
      chrome.runtime.id = 'extension';
      chrome.runtime.lastError = null;
    });

    it('should close all the worker tabs', () => {
      const findAllWorkerTabsMock = sinon.mock().returns([{id: 1}, {id: 2}]);
      utils.__set__('findAllWorkerTabs', findAllWorkerTabsMock);
      chrome.tabs.remove.withArgs(1).yields(undefined);
      chrome.tabs.remove.withArgs(2).yields(undefined);
      return expect(closeAllWorkerTabs()).to.be.fulfilled;
    });

    afterEach(() => {
      utils.__set__('findAllWorkerTabs', origFindAllWorkerTabs);
    })
  });

  after(() => {
    chrome.flush();
    global.chrome = origChrome;
  });
});
