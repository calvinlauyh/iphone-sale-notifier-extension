import { expect } from 'chai';
import rewire from 'rewire';

let iPhoneDb = rewire('./iPhoneDb');

describe('.getAll()', () => {
  let origIPhoneData;
  before(()=> {
    origIPhoneData = iPhoneDb.__get__('iPhoneData');
    iPhoneDb.__set__('iPhoneData', [
    {
      "_id": "iphone8_47_silver_64",
      "model": "iphone8",
      "size": "47",
      "color": "silver",
      "capacity": "64",
      "methods": [{
        "worker": "tab",
        "type": "store",
        "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20"
      }]
    },
    {
      "_id": "iphone8_47_silver_256",
      "model": "iphone8",
      "size": "47",
      "color": "silver",
      "capacity": "256",
      "methods": [{
        "worker": "tab",
        "type": "store",
        "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21"
      }]
    }
    ]);
  });

  it('should return a list of all the iPhones', () => {
    expect(iPhoneDb.getAll()).to.deep.equal([
      {
        "_id": "iphone8_47_silver_64",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "64",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20"
        }]
      },
      {
        "_id": "iphone8_47_silver_256",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "256",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21"
        }]
      }
    ]);
  });

  after(() => {
    iPhoneDb.__set__('iPhoneData', origIPhoneData);
  });
})

describe('.findById()', () => {
  let origIPhoneData;
  before(()=> {
    origIPhoneData = iPhoneDb.__get__('iPhoneData');
    iPhoneDb.__set__('iPhoneData', [
    {
      "_id": "iphone8_47_silver_64",
      "model": "iphone8",
      "size": "47",
      "color": "silver",
      "capacity": "64",
      "methods": [{
        "worker": "tab",
        "type": "store",
        "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20"
      }]
    },
    {
      "_id": "iphone8_47_silver_256",
      "model": "iphone8",
      "size": "47",
      "color": "silver",
      "capacity": "256",
      "methods": [{
        "worker": "tab",
        "type": "store",
        "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21"
      }]
    }
    ]);
  });

  it('should return the phone data referenced by the id', () => {
    const actual = iPhoneDb.findById('iphone8_47_silver_64');

    expect(actual).to.deep.equal({
      '_id': 'iphone8_47_silver_64',
      'model': 'iphone8',
      'size': '47',
      'color': 'silver',
      'capacity': '64',
      'methods': [{
        'worker': 'tab',
        'type': 'store',
        'url': 'iphone-8/4.7-inch-display-64gb-silver#00,10,20'
      }]
    });
  });

  it('should return undefined when the id does not exist', () => {
    const actual = iPhoneDb.findById('not_exist');

    expect(actual).to.be.undefined;
  });

  after(() => {
    iPhoneDb.__set__('iPhoneData', origIPhoneData);
  });
});

describe('.groupByModel()', () => {
  it('should return array of phone data grouped by models', () => {
    const actual = iPhoneDb.groupByModel([
      {
        "_id": "iphone8_47_silver_64",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "64",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20"
        }]
      },
      {
        "_id": "iphonex_space-gray_64",
        "model": "iphonex",
        "size": "58",
        "color": "space-gray",
        "capacity": "64",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-x/5.8-inch-display-64gb-space-gray#01,10,20"
        }]
      },
      {
        "_id": "iphone8_47_silver_256",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "256",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21"
        }]
      },
      {
        "_id": "iphonex_space-gray_256",
        "model": "iphonex",
        "size": "58",
        "color": "space-gray",
        "capacity": "256",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-x/5.8-inch-display-256gb-space-gray#01,10,21"
        }]
      }
    ]);

    expect(actual).to.deep.equal([
    [
      // iphone8
      {
        "_id": "iphone8_47_silver_64",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "64",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20"
        }]
      },
      {
        "_id": "iphone8_47_silver_256",
        "model": "iphone8",
        "size": "47",
        "color": "silver",
        "capacity": "256",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21"
        }]
      }
    ],
    [
      // iphonex
      {
        "_id": "iphonex_space-gray_64",
        "model": "iphonex",
        "size": "58",
        "color": "space-gray",
        "capacity": "64",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-x/5.8-inch-display-64gb-space-gray#01,10,20"
        }]
      },
      {
        "_id": "iphonex_space-gray_256",
        "model": "iphonex",
        "size": "58",
        "color": "space-gray",
        "capacity": "256",
        "methods": [{
          "worker": "tab",
          "type": "store",
          "url": "iphone-x/5.8-inch-display-256gb-space-gray#01,10,21"
        }]
      }
    ]
    ])
  });
});