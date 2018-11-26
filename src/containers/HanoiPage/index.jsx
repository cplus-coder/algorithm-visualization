import React, { useState } from 'react';
import Hanoi from './Hanoi';
import styles from './index.less';

import data from './data'

const HanoiPage = () => {
  const [data, setData] = useState(data);
  return (
    <div className={styles.wrapper}>
      <Hanoi data={data} towerNums={4} />
    </div>
  );
};

export default HanoiPage;