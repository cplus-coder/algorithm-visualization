import React, { memo, useEffect, useRef } from 'react';
import d3 from 'd3';
import { ReactUtil } from '../../../utils';
import styles from './index.less';

const renderTow = (towerNums) => {
  const towers = [];
  const towerWidth = 80 / towerNums;
  const pillarWidth = 1 / 16; // of towerWidth
  while (towerNums--) towers.push(
    <div key={towerNums} className={styles.tower} style={{ width: `${towerWidth}%`, height: '10%' }}>
      <div className={styles.pillar} style={{ width: `${towerWidth * pillarWidth}%`, height: '85%', transform: `translate(${(1 - pillarWidth) / 2 / pillarWidth * 100}%, -100%)` }}/>
    </div>
  );
  return towers;
}

const Hanoi = memo(({ towerNums, data }) => {
  const wrapper = useRef(null);
  useEffect(()=> {

  });

  return (
    <div ref={wrapper} className={styles.wrapper} >
      {renderTow(towerNums)}
    </div>
  );
});

Hanoi.defaultProps = {
  towerNums: 4,
}

export default Hanoi;