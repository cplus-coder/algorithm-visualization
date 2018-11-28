import React, { useState } from 'react';
import { Button } from 'antd';
import Hanoi from './Hanoi';
import styles from './index.less';

const data1 = [
  {
    index: 0,
    pillar: 0,
    depth: 0
  },
  {
    index: 1,
    pillar: 0,
    depth: 1,
  }
]

const data2 = [
  {
    index: 0,
    pillar: 0,
    depth: 0
  },
  {
    index: 1,
    pillar: 1,
    depth: 0,
  }
]

const HanoiPage = () => {
  const [data, setData] = useState(data1);
  return (
    <div className={styles.wrapper}>
      <Hanoi data={data} towerNums={4} />
      <div className={styles.panel} >
        <div className={styles.panelArea}>
        </div>
        <div className={styles.panelArea}>
        </div>
        <div className={styles.panelArea}>
          <Button className={styles.button} icon="step-backward" type="primary" onClick={() => setData(data1)}>上一步</Button>
          <Button className={styles.button} icon="step-forward"  type="primary" onClick={() => setData(data2)}>下一步</Button>
        </div>
      </div>
    </div>
  );
};

export default HanoiPage;