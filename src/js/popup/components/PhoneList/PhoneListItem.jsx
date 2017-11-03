import React, { Component } from 'react';
import Radium from 'radium'
import { translate } from 'react-i18next';
import { getPhoneName } from 'popup/utils/phoneStatusUtils';
import constant from 'constant';

@translate('translation')
@Radium
export default class PhoneListItem extends Component {
  handleClick = (e) => {
    const {
      item,
      onClick
    } = this.props;

    onClick(item);
  }

  render() {
    const {
      t,
      item,
      checkable,
      checked
    } = this.props;
    const {
      status,
      model,
      size,
      color,
      capacity
    } = item;

    return (
      <a style={styles.container} onClick={this.handleClick}>
        { checkable && (
          <div style={styles.actionContainer}>
            <input style={styles.checkbox} type="checkbox" checked={checked} onChange={this.handleClick} />
          </div>
        )}
        <div style={styles.infoFlexBox}>
          <div style={styles.infoContainer}>
            <div style={styles.colorContainer}>
              <div style={styles.colorCircleContainer}>
                <div style={[styles.colorCircle, {backgroundColor: color}]}></div>
              </div>
              <div style={styles.colorText}>{t(`iphone.color.${color}`)}</div>
            </div>
            <div style={styles.title}>
              <div style={styles.titleModel}>{t(`iphone.model.${model}`)}</div>
              <div style={styles.titleSize}>{t(`iphone.size.${size}`)}</div>
              <div style={styles.titleCapacity}>{t(`iphone.capacity.${capacity}`)}</div>
            </div>
            {typeof status !== 'undefined' && (
              <div style={styles.status}>
                {
                  (status === constant.PHONESTATUS.INSTOCK)?
                    (
                      <div style={styles.statusInStock}>{t('phoneStatus.inStock')}</div>
                    ):
                  (status === constant.PHONESTATUS.PENDING)?
                    (
                      <div style={styles.statusPending}>{t('phoneStatus.pending')}</div>
                    ):
                    (
                      <div style={styles.statusUnavailable}>{t('phoneStatus.unavailable')}</div>
                    )
                }
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }
}

const containerHeight = 60;
const colorContainerHeight = 50;
const colorTextHeight = 30;
const styles = {
  container: {
    display: 'block',
    height: containerHeight,
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #CCC',
    overflow: 'hidden',
    ':hover': {
      backgroundColor: '#FAFAFA'
    }
  },
  actionContainer:{
    display: 'inline-block',
    width: 60,
    height: containerHeight,
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
    cursor: 'pointer'
  },
  checkbox: {
    margin: 0,
    padding: 0,
    height: containerHeight,
    cursor: 'pointer'
  },
  infoFlexBox: {
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    cursor: 'pointer'
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    height: colorContainerHeight,
    paddingTop: (containerHeight-colorContainerHeight)/2,
    textAlign: 'center'
  },
  colorCircleContainer: {
    height: containerHeight-colorTextHeight
  },
  colorCircle: {
    display: 'inline-block',
    width: 10,
    height: 10,
    marginTop: (colorContainerHeight-colorTextHeight-10), // vertical-middle-align
    borderRadius: 50
  },
  colorText: {
    fontSize: 12,
    height: colorTextHeight,
    lineHeight: (colorTextHeight-1)/2+'px',
    whiteSpace: 'normal'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: '0 15px',
    fontSize: 14,
    lineHeight: containerHeight+'px'
  },
  titleModel: {
    marginRight: 10,
  },
  titleSize: {
    marginRight: 10,
  },
  titleCapacity: {},
  status: {
    width: 80,
    lineHeight: containerHeight+'px',
    textAlign: 'center',
    color: '#FFF'
  },
  statusUnavailable: {
    backgroundColor: '#FFCDD2'
  },
  statusPending: {
    backgroundColor: '#FFE0B2'
  },
  statusInStock: {
    backgroundColor: '#009688'
  }
};
