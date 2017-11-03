import { expect } from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import { buildOverview } from './phoneStatusUtils';
const phoneStatusUtils = rewire('./phoneStatusUtils.js');

describe('#composeSort()', () => {
  const composeSort = phoneStatusUtils.__get__('composeSort');

  it('should compose several comparator functions together', () => {
    const data = [[1,1], [0,1], [1,0]];

    const sortByFirstEl = (a, b) => a[0]-b[0];
    const sortBySecondEl = (a, b) => a[1]-b[1];

    const sort1stThen2nd = composeSort(sortByFirstEl, sortBySecondEl);
    const sort2ndThen1st = composeSort(sortBySecondEl, sortByFirstEl);

    expect(data.sort(sort1stThen2nd)).to.deep.equal([[0,1],[1,0],[1,1]]);
    expect(data.sort(sort2ndThen1st)).to.deep.equal([[1,0],[0,1],[1,1]]);
  });
})

describe('#sortByInStockSinceDesc()', () => {
  const sortByInStockSinceDesc = phoneStatusUtils.__get__('sortByInStockSinceDesc');

  it('should return 1 when A in stock time is earlier than that of B', () => {
    const a = {inStockSince: 0};
    const b = {inStockSince: 1};
    const actual = sortByInStockSinceDesc(a, b);

    expect(actual).to.equal(1);
  });

  it('should return 1 when A in stock time is later than that of B', () => {
    const a = {inStockSince: 1};
    const b = {inStockSince: 0};
    const actual = sortByInStockSinceDesc(a, b);

    expect(actual).to.equal(-1);
  });

  it('should return 0 when A in stock time is equal to that of B', () => {
    const a = {inStockSince: 0};
    const b = {inStockSince: 0};
    const actual = sortByInStockSinceDesc(a, b);

    expect(actual).to.equal(0);
  });
});

describe('#sortByModel()', () => {
  const sortByModel = phoneStatusUtils.__get__('sortByModel');

  it('should return -1 when the A model is alphabetically less than that of B', () => {
    const a = {model: 'a'};
    const b = {model: 'b'};
    const actual = sortByModel(a, b);

    expect(actual).to.equal(-1);
  });

  it('should return 1 when the A model is alphabetically greater than that of B', () => {
    const a = {model: 'b'};
    const b = {model: 'a'};
    const actual = sortByModel(a, b);

    expect(actual).to.equal(1);
  });

  it('should return 1 when the A model is alphabetically equal to that of B', () => {
    const a = {model: 'a'};
    const b = {model: 'a'};
    const actual = sortByModel(a, b);

    expect(actual).to.equal(0);
  });
});

describe('#sortById()', () => {
  const sortById = phoneStatusUtils.__get__('sortById');

  it('should return -1 when the A id is alphabetically less than that of B', () => {
    const a = {'_id': 'a'};
    const b = {'_id': 'b'};
    const actual = sortById(a, b);

    expect(actual).to.equal(-1);
  });

  it('should return 1 when the A id is alphabetically greater than that of B', () => {
    const a = {'_id': 'b'};
    const b = {'_id': 'a'};
    const actual = sortById(a, b);

    expect(actual).to.equal(1);
  });

  it('should return 1 when the A id is alphabetically equal to that of B', () => {
    const a = {'_id': 'a'};
    const b = {'_id': 'a'};
    const actual = sortById(a, b);

    expect(actual).to.equal(0);
  });
});

const iPhoneDbStub = {
  findById: (id) => {
    switch(id) {
      case 'iphone8_47_silver_64':
        return {
          '_id': 'iphone8_47_silver_64',
          'model': 'iphone8'
        };
      case 'iphone8_47_gold_64':
        return {
          '_id': 'iphone8_47_gold_64',
          'model': 'iphone8'
        };
      case 'iphonex_silver_64':
        return {
          '_id': 'iphonex_silver_64',
          'model': 'iphonex'
        };
      case 'iphonex_silver_256':
        return {
          '_id': 'iphonex_silver_256',
          'model': 'iphonex'
        };
      case 'iphonex_space-gray_64':
        return {
          '_id': 'iphonex_space-gray_64',
          'model': 'iphonex'
        };
    }
  }
};
const phoneStatus = {
  'iphone8_47_silver_64': {
    'status': 2,
    'inStockSince': 1507424958600
  },
  'iphone8_47_gold_64': {
    'status': 0,
    'inStockSince': 0
  },
  'iphonex_silver_64': {
    'status': 1,
    'inStockSince': 0
  },
  'iphonex_silver_256': {
    'status': 2,
    'inStockSince': 1507424958601
  }
};

describe('buildOverview()', () => {
  it('should return an array', () => {
    const monitorList = [
      'iphone8_47_silver_64',
      'iphone8_47_gold_64'
    ];
    const actual = buildOverview(iPhoneDbStub, monitorList, []);

    expect(actual).to.be.an('array');
  });

  it('should build an overview of the phones in monitor phone list only', () => {
    const monitorList = [
      'iphone8_47_silver_64',
      'iphone8_47_gold_64'
    ];
    const actual = buildOverview(iPhoneDbStub, monitorList, phoneStatus);

    expect(actual).to.deep.equal([
      [
        {
          '_id': 'iphone8_47_silver_64',
          'model': 'iphone8',
          'status': 2,
          'inStockSince': 1507424958600
        },
        {
          '_id': 'iphone8_47_gold_64',
          'model': 'iphone8',
          'status': 0,
          'inStockSince': 0
        }
      ]
    ]);
  });

  it('should sort the phones with ascending order of in stock time, then by model, finally by name', () => {
    const monitorList = [
      'iphone8_47_silver_64',
      'iphone8_47_gold_64',
      'iphonex_silver_64',
      'iphonex_silver_256'
    ];
    const actual = buildOverview(iPhoneDbStub, monitorList, phoneStatus);

    expect(actual).to.deep.equal([
      [
        {
          '_id': 'iphonex_silver_256',
          'model': 'iphonex',
          'status': 2,
          'inStockSince': 1507424958601
        },
        {
          '_id': 'iphonex_silver_64',
          'model': 'iphonex',
          'status': 1,
          'inStockSince': 0
        }
      ],
      [
        {
          '_id': 'iphone8_47_silver_64',
          'model': 'iphone8',
          'status': 2,
          'inStockSince': 1507424958600
        },
        {
          '_id': 'iphone8_47_gold_64',
          'model': 'iphone8',
          'status': 0,
          'inStockSince': 0
        }
      ]
    ]);
  });

  it('should group similar models together', () => {
    const monitorList = [
      'iphone8_47_silver_64',
      'iphone8_47_gold_64',
      'iphonex_silver_64',
      'iphonex_silver_256'
    ];
    const actual = buildOverview(iPhoneDbStub, monitorList, phoneStatus);

    expect(actual).to.deep.equal([
      [
        {
          '_id': 'iphonex_silver_256',
          'model': 'iphonex',
          'status': 2,
          'inStockSince': 1507424958601
        },
        {
          '_id': 'iphonex_silver_64',
          'model': 'iphonex',
          'status': 1,
          'inStockSince': 0
        }
      ],
      [
        {
          '_id': 'iphone8_47_silver_64',
          'model': 'iphone8',
          'status': 2,
          'inStockSince': 1507424958600
        },
        {
          '_id': 'iphone8_47_gold_64',
          'model': 'iphone8',
          'status': 0,
          'inStockSince': 0
        }
      ]
    ]);
  });

  it('should perform a "left-outer-join" of the monitor phone list to phone status', () => {
    const monitorList = ['iphonex_space-gray_64'];
    const actual = buildOverview(iPhoneDbStub, monitorList, phoneStatus);

    expect(actual).to.deep.equal([
      [
        {
          '_id': 'iphonex_space-gray_64',
          'model': 'iphonex',
          'status': 0,
          'inStockSince': 0
        }
      ]
    ]);
  });
});
