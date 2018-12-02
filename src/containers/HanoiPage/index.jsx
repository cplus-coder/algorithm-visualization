import React, { useState } from 'react';
import { Button, InputNumber, Slider } from 'antd';
import Hanoi from './Hanoi';
import styles from './index.less';
import { getNextData, getPreData, playAllData } from './calculate'

const initData = [
  {
    pillar: 0,
    depth: 0
  },
  {
    pillar: 0,
    depth: 1,
  },
  {
    pillar: 0,
    depth: 2,
  }
]
const initNewData = (dataLength) => {
  const data = [];
  for(let i = 0;i < dataLength; i += 1) data.push({ pillar: 0, depth: i});
  return data;
}

const HanoiPage = () => {
  const [data, setData] = useState(initData);
  const [speed, setSpeed] = useState(1);
  console.log(data)
  return (
    <div className={styles.wrapper}>
      <Hanoi data={data} speed={speed} towerNums={4} />
      <div className={styles.panel} >
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>参数设置</span>
          <div className={styles.panelInput}>R值: <InputNumber className={styles.input} min={1} max={100} value={0}/></div>
          <div className={styles.panelInput}>盘子数量: <InputNumber className={styles.input} min={1} max={64} value={data.length} onChange={value => setData(initNewData(value))}/></div>
          <div className={styles.panelInput}>动画速度: <Slider className={styles.slider} min={1} max={20} value={speed} onChange={value => setSpeed(value)}/></div>
        </div>
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>数据统计</span>
          <p>移动步数：{}</p>
          <p>剖分数：{}</p>
        </div>
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>游戏控制</span>
          <div className={styles.ButtonGroup}>
            <Button className={styles.button} icon="step-backward" size="large" type="primary" onClick={() => setData(getPreData(data))}>上一步</Button>
            <Button className={styles.button} icon="step-forward"  size="large" type="primary" onClick={() => setData(getNextData(data))}>下一步</Button>
          </div>
          <div className={`${styles.ButtonGroup} ${styles.special}`}>
            <Button className={styles.button} icon="fast-forward"  size="large" type="primary" onClick={() => playAllData(setData,data)}>播放</Button>
            <Button className={styles.button} icon="pause"  size="large" type="primary" onClick={() => console.log('111')}>暂停</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanoiPage;