import { expect } from 'chai';
import sinon from 'sinon';
import { getPhoneName } from './phoneUtils';

describe('getPhoneName', () => {
  it('should return the phone name using the translation function given', () => {
    const t = sinon.stub();
    t.withArgs('iphone.model.iphonex').returns("iPhone X");
    t.withArgs('iphone.color.space-gray').returns("Space Gray");
    t.withArgs('iphone.size.47').returns("4.7\"");
    t.withArgs('iphone.capacity.256').returns("256GB");

    const phone = {
      model: 'iphonex',
      color: 'space-gray',
      size: "47",
      capacity: "256"
    }
    expect(getPhoneName(t, phone)).to.equal('iPhone X 4.7" 256GB')
  });
});