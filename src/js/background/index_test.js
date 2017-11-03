import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import chrome from 'sinon-chrome';
import rewire from 'rewire';

import * as utils from './utils';
import constant from '../constant';