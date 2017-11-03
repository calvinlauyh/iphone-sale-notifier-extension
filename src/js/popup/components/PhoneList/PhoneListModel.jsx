import React, { Component } from 'react';
import Radium from 'radium'
import { translate } from 'react-i18next';
import PhoneListItem from './PhoneListItem';

@translate('translation')
@Radium
export default class PhoneListModel extends Component {
  renderItem = (item) => {
    const {
      itemCheckable,
      isItemChecked,
      onItemClick
    } = this.props;

    return (
      <PhoneListItem
        checkable={itemCheckable}
        checked={itemCheckable && item.checked}
        key={item._id}
        item={item}
        onClick={onItemClick}
      />
    )
  }

  render() {
    const {
      t,
      items
    } = this.props;
    const {
      model,
      remark
    }= items[0];

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          {t(`iphone.model.${model}`)}
          {remark && <span style={styles.remark}>{t(`iphone.remark.${remark}`)}</span>}
        </div>
        {items.map(this.renderItem)}
      </div>
    );
  }
}

const styles = {
  container: {
  },
  header: {
    borderBottom: '1px solid #CCC',
    lineHeight: '50px',
    fontSize: 14,
    paddingLeft: 35
  },
  remark: {
    paddingLeft: 10
  }
};
