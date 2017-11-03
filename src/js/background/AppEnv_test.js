import 'regenerator-runtime/runtime';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';
import chromep from '../library/chrome-promise';
import rewire from 'rewire';

const AppEnv = rewire('./AppEnv');
const localStorage = {
  getItem: () => {},
  setItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
};

describe('-getRootKey()', () => {
  let getRootKey;
  before(() => {
    getRootKey = AppEnv.__get__('getRootKey');
  });

  it('should return the root of the provided key chain', () => {
    expect(getRootKey('a.b.c.d')).to.equal('a');
  });

  it('should return the key chain when the key chain contains only single key', () => {
    expect(getRootKey('root')).to.equal('root');
  });
});

describe('-removeRootKey()', () => {
  let removeRootKey;
  before(() => {
    removeRootKey = AppEnv.__get__('removeRootKey');
  });

  it('should remove the root key from a key chain', () => {
    expect(removeRootKey('a.b.c.d')).to.equal('b.c.d');
  });

  context('When the key chain only has a single key', () => {
    it('should return an empty string', () => {
      expect(removeRootKey('a')).to.equal('');
    });
  });
});

describe('-objHasKeyChain`()', () => {
  let objHasKeyChain;
  before(() => {
    objHasKeyChain = AppEnv.__get__('objHasKeyChain');
  });

  it('should return true when the object contains the key chain', () => {
    const obj = {a: {b: {c: {d: 'value'}}}};
    expect(objHasKeyChain(obj, 'a.b.c.d')).to.be.true;
  });

  context('When the object does not contain the key chain', () => {
    it('should return false', () => {
      const obj = {e: {f: {g: {h: 'value'}}}};
      expect(objHasKeyChain(obj, 'a.b.c.d')).to.be.false;
    });
  });

  context('When the object only contains part of the key chain', () => {
    it('should return false', () => {
      const obj = {a: {b: 'value'}};
      expect(objHasKeyChain(obj, 'a.b.c.d')).to.be.false;
    });
  });

  context('When the key chain is a single key', () => {
    it('should return true if the object contains the key', () => {
      const obj = {a: 'value'};
      expect(objHasKeyChain(obj, 'a')).to.be.true;
    });
  });
});

describe('-getValueByKeyChain', () => {
  let getValueByKeyChain;
  before(() => {
    getValueByKeyChain = AppEnv.__get__('getValueByKeyChain');
  });

  it('should return the value referenced by the key chain', () => {
    const obj = {a: {b: {c: {d: 'value'}}}};
    expect(getValueByKeyChain(obj, 'a.b.c.d')).to.equal('value');
  });

  context('When the object does not contain the key chain', () => {
    it('should throw an error', () => {
      const obj = {e: {f: {g: {h: 'value'}}}};
      expect(
        () => getValueByKeyChain(obj, 'a.b.c.d')
      ).to.throw(Error);
    });
  });

  context('When the object only contains part of the key chain', () => {
    it('should throw an error', () => {
      const obj = {a: {b: 'value'}};
      expect(
        () => getValueByKeyChain(obj, 'a.b.c.d')
      ).to.throw(Error);
    });
  });

  context('When the key chain is a single key', () => {
    it('should return the value referenced by the key', () => {
      const obj = {a: 'value'};
      expect(getValueByKeyChain(obj, 'a')).to.equal('value');
    });
  });

  context('When the key chain is empty', () => {
    it('should return the original value', () => {
      const obj = 'value';
      expect(getValueByKeyChain(obj, '')).to.equal('value');
    });
  });
});

describe('-setValueByKeyChain', () => {
  let setValueByKeyChain;
  before(() => {
    setValueByKeyChain = AppEnv.__get__('setValueByKeyChain');
  });

  it('should return an object with value referenced by the key chain updated', () => {
    const obj = {a: {b: {c: {d: 'value'}}}};
    expect(
      setValueByKeyChain(obj, 'a.b.c.d', 'changed')
    ).to.deep.equal({a: {b: {c: {d: 'changed'}}}});
  });

  context('When the object does not contain the key chain', () => {
    it('should throw an error', () => {
      const obj = {e: {f: {g: {h: 'value'}}}};
      expect(
        () => setValueByKeyChain(obj, 'a.b.c.d', 'changed')
      ).to.throw(Error);
    });
  });

  context('When the object only contains part of the key chain', () => {
    it('should throw an error', () => {
      const obj = {a: {b: 'value'}};
      expect(
        () => setValueByKeyChain(obj, 'a.b.c.d', 'changed')
      ).to.throw(Error);
    });
  });

  context('When the key chain is a single key', () => {
    it('should return update the value referenced by the key', () => {
      const obj = {a: 'value'};
      expect(setValueByKeyChain(obj, 'a', 'changed')).to.deep.equal({a: 'changed'});
    });
  });

  context('When the key chain is empty', () => {
    it('should return the new value', () => {
      const obj = 'value';
      expect(setValueByKeyChain(obj, '', 'changed')).to.equal('changed');
    });
  });
});

describe('AppEnv()', () => {
  let origChrome;
  let origLocalStorage;
  let origStorageDefault;
  let configMock;
  let AppEnv;
  before(() => {
    origChrome = global.chrome;
    global.chrome = chrome;
    origLocalStorage = global.localStorage;
    global.localStorage = localStorage;
    AppEnv = rewire('./AppEnv');
    origStorageDefault = AppEnv.__get__('storageDefault');
    configMock = {
      status:       0,
      monitorPhone: [],
      phoneStatus:  {},
    };
  });
  const restore = () => {
    if (localStorage.getItem.restore) {
      localStorage.getItem.restore();
    }
    if (localStorage.setItem.restore) {
      localStorage.setItem.restore();
    }
    AppEnv.__set__('storageDefault', configMock);
    AppEnv.__set__('storageKeys', Object.keys(configMock))
  }
  beforeEach(restore);
  afterEach(restore);

  it('should return an object with get and set methods', () => {
    const getItemStub = sinon.stub(localStorage, 'getItem');
    getItemStub.withArgs('status').returns('0');
    getItemStub.withArgs('monitorPhone').returns('[]');
    getItemStub.withArgs('phoneStatus').returns('{}');

    const actual = AppEnv();
    expect(actual.get).to.be.a('function');
    expect(actual.set).to.be.a('function');
  });

  context('When there are some missing keys in local storage', () => {
    it('should set those keys to default value in local storage', async () => {
      const getItemStub = sinon.stub(localStorage, 'getItem').returns(null);
      const setItemStub = sinon.stub(localStorage, 'setItem');

      const setStatusMock = setItemStub.withArgs('status', '0').returns(undefined);
      const setMonitorPhoneMock = setItemStub.withArgs('monitorPhone', '[]').returns(undefined);
      const setPhoneStatusMock = setItemStub.withArgs('phoneStatus', '{}').returns(undefined);

      AppEnv();

      expect(setStatusMock.calledOnce).to.be.true;
      expect(setMonitorPhoneMock.calledOnce).to.be.true;
      expect(setPhoneStatusMock.calledOnce).to.be.true;
    });

    context('When the local storage cannot be updated', () => {
      it('should throw an error', () => {
        const getItemStub = sinon.stub(localStorage, 'getItem').returns(null);
        const setItemStub = sinon.stub(localStorage, 'setItem').throws(new Error('error'));

        expect(() => AppEnv()).to.throw();
      });
    });
  });

  describe('.get()', () => {
    let getItemStub;
    let appEnv;
    let origData;
    beforeEach(() => {
      getItemStub = sinon.stub(localStorage, 'getItem');
      getItemStub.withArgs('status').returns(0);
      getItemStub.withArgs('monitorPhone').returns('[]');
      getItemStub.withArgs('phoneStatus').returns('{}');
      appEnv = AppEnv();
      origData = appEnv.__getData();
      appEnv.__setData({
        version: '1.0',
        tabRuntime: {
          jobList: [],
          currentJobIdx: -1,
          workerTabList: [],
        }
      });

      getItemStub.restore();
    });
    context('Given a single key', () => {
      context('When the key refers to a value in local storage', () => {
        it('should return the value retrieved from local storage', () => {
          sinon.stub(localStorage, 'getItem').withArgs('status').returns(1);
          expect(appEnv.get('status')).to.equal(1);
        });

        context('When the local storage item does not exist', () => {
          it('should throw an error', () => {
            sinon.stub(localStorage, 'getItem').withArgs('status').returns(null);
            expect(() => appEnv.get('status')).to.throw(Error);
          });
        });
      });

      context('When the key refers to a value in App environment', () => {
        it('should return the App environment variable value', () => {
          expect(appEnv.get('version')).to.equal('1.0');
        });

        context('When the App environment variable does not exist', () => {
          it('should throw an error', () => {
            expect(() => appEnv.get('newItem')).to.throw(Error);
          });
        });
      });
    });

    context('Given a key chain ', () => {
      context('When the key refers to a value in local storage', () => {
        it('should return the value retrieved from local storage', () => {
          sinon.stub(localStorage, 'getItem')
            .withArgs('phoneStatus')
            .returns('{"iphonex": {"status": 2}}');
          expect(appEnv.get('phoneStatus.iphonex.status')).to.equal(2);
        });

        context('When the local storage item does not exist', () => {
          it('should throw an error', () => {
            sinon.stub(localStorage, 'getItem').withArgs('status').returns(null);
            expect(() => appEnv.get('status')).to.throw(Error);
          });
        });

        context('When the local storage contains only the root key', () => {
          it('should throw an error', () => {
            sinon.stub(localStorage, 'getItem')
              .withArgs('phoneStatus')
              .returns({iphonx: {status: 2}});
            expect(() => appEnv.get('phonestatus.iphonx.notExist')).to.throw(Error);
          });
        });
      });

      context('When the key refers to a value in App environment variable', () => {
        it('should return the App environment variable value', () => {
          expect(appEnv.get('tabRuntime.currentJobIdx')).to.equal(-1);
        });

        context('When the App environment variable does not exist', () => {
          it('should throw an error', () => {
            expect(() => appEnv.get('notExist')).to.throw(Error);
          });
        });

        context('When the App environment contains only the root key', () => {
          it('should throw an error', () => {
            expect(() => appEnv.get('tabRuntime.notExist')).to.throw(Error);
          });
        });
      });
    });

    after(() => {
      appEnv.__setData(origData);
      AppEnv.__set__('storageDefault', origStorageDefault);
    });
  });

  describe('.set()', () => {
    let getItemStub, setItemStub;
    let appEnv;
    let origData;
    beforeEach(() => {
      getItemStub = sinon.stub(localStorage, 'getItem');
      getItemStub.withArgs('status').returns(0);
      getItemStub.withArgs('monitorPhone').returns('[]');
      getItemStub.withArgs('phoneStatus').returns('{}');
      appEnv = AppEnv();
      origData = appEnv.__getData();
      appEnv.__setData({
        version: '1.0',
        tabRuntime: {
          jobList: [],
          currentJobIdx: -1,
          workerTabList: [],
        }
      });

      getItemStub.restore();
    });

    context('Given a single key', () => {
      context('When the key exists in local storage', () => {
        it('should update the item in local storage', () => {
          sinon.stub(localStorage, 'getItem').withArgs('status').returns(1);
          const setItemStub = sinon.stub(localStorage, 'setItem').withArgs('status', '2');
          appEnv.set('status', 2);
          expect(setItemStub.calledOnce).to.be.true;
        });
      });

      context('When the key exists in App environment', () => {
        it('should update the App environment variable value', () => {
          appEnv.set('version', '2.0');
          const data = appEnv.__getData();
          expect(data['version']).to.equal('2.0')
        });
      });

      context('When the App environment variable does not exist', () => {
        it('should create the item', () => {
          appEnv.set('newItem', 'value');
          const data = appEnv.__getData();
          expect(data['newItem']).to.equal('value');
        });
      });
    });

    context('Given a key chain ', () => {
      context('When the key chain exists in local storage', () => {
        it('should udpate the item in local storage', () => {
          sinon.stub(localStorage, 'getItem')
            .withArgs('phoneStatus')
            .returns('{"iphonex":{"status":2}}');
          const setItemStub = sinon.stub(localStorage, 'setItem')
            .withArgs('phoneStatus', '{"iphonex":{"status":0}}')
            .returns(undefined);
          appEnv.set('phoneStatus.iphonex.status', 0);
          expect(setItemStub.calledOnce).to.be.true;
        });
      });

      context('When the key chain does not exist in local storage', () => {
        it('should throw an error', () => {
          sinon.stub(localStorage, 'getItem')
            .withArgs('phoneStatus')
            .returns('{"iphonex": {"status": 2}}');
          expect(() => appEnv.set('phoneStatus.iphone8.status', 1)).to.throw(Error);
        });
      });

      context('When the local storage contains all the keys except the last part', () => {
        it('should create the item', () => {
          sinon.stub(localStorage, 'getItem')
            .withArgs('phoneStatus')
            .returns('{"iphonex":{"status":2}}');
          const setItemStub = sinon.stub(localStorage, 'setItem')
            .withArgs('phoneStatus', '{"iphonex":{"status":2,"color":"silver"}}')
            .returns(undefined);
          appEnv.set('phoneStatus.iphonex.color', 'silver');
          expect(setItemStub.calledOnce).to.be.true;
        });
      });

      context('When the key refers to a value in App environment variable', () => {
        it('should update the App environment variable value', () => {
          appEnv.set('tabRuntime.currentJobIdx', 2);
          const data = appEnv.__getData();
          expect(data['tabRuntime']['currentJobIdx']).to.equal(2);
        });
      });

      context('When the App environment variable does not exist', () => {
        it('should throw an error', () => {
          expect(
            () => appEnv.set('tabRuntime.notExist.status', 'value')
          ).to.throw(Error);
        });
      });

      context('When the App environment contains all the keys except the last part', () => {
        it('should create the item', () => {
          appEnv.set('tabRuntime.newItem', 'value')
          const data = appEnv.__getData();
          expect(data['tabRuntime']['newItem']).to.equal('value');
        });
      });
    });

    after(() => {
      appEnv.__setData(origData);
    });
  });

  describe('.repair()', () => {
    let getItemStub, setItemStub;
    let appEnv;
    beforeEach(() => {
      getItemStub = sinon.stub(localStorage, 'getItem');
      getItemStub.withArgs('status').returns('0');
      getItemStub.withArgs('monitorPhone').returns('[]');
      getItemStub.withArgs('phoneStatus').returns('{}');
      appEnv = AppEnv();

      getItemStub.restore();
    });

    context('When the storage item does not exist', () => {
      it('should set the item to its default value', () => {
        const getItemStub = sinon.stub(localStorage, 'getItem');
        getItemStub.withArgs('status').returns(null);
        getItemStub.withArgs('monitorPhone').returns('[]');
        getItemStub.withArgs('phoneStatus').returns('{}');
        const setItemStub = sinon.stub(localStorage, 'setItem').withArgs('status', '0');

        appEnv.repair();
        expect(setItemStub.calledOnce).to.be.true;
      });
    });

    context('When the storage item does not match the same data type as default value', () => {
      it('should set the item to its default value', () => {
        const getItemStub = sinon.stub(localStorage, 'getItem');
        getItemStub.withArgs('status').returns('{}');
        getItemStub.withArgs('monitorPhone').returns('[]');
        getItemStub.withArgs('phoneStatus').returns('{}');
        const setItemStub = sinon.stub(localStorage, 'setItem').withArgs('status', '0');

        appEnv.repair();
        expect(setItemStub.calledOnce).to.be.true;
      });
    });

    context('When the storage item are all in correct format', () => {
      it('should not try to repair anything', () => {
        const getItemStub = sinon.stub(localStorage, 'getItem');
        getItemStub.withArgs('status').returns('0');
        getItemStub.withArgs('monitorPhone').returns('[]');
        getItemStub.withArgs('phoneStatus').returns('{}');
        const setItemStub = sinon.stub(localStorage, 'setItem');

        appEnv.repair();
        expect(setItemStub.notCalled).to.be.true;
      });
    });
  });

  after(() => {
    chrome.flush();
    global.chrome = origChrome;
    global.localStorage = origLocalStorage;
  });
});
