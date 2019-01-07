import React, { useState } from 'react';
import { Button, InputNumber, Slider, Progress, Radio } from 'antd';
import Hanoi from './Hanoi';
import styles from './index.less';
import { getNextData, getPreData, playAllData, getNewInitData, getSpeed, banPlay, AllstepNum, NowStep, getTowerNums, setRValue, rValue } from './calculate'

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
getNewInitData(initData);
const initNewData = (dataLength) => {
  const data = [];
  for(let i = 0;i < dataLength; i += 1) data.push({ pillar: 0, depth: i});
  getNewInitData(data);
  return data;
}
//let towerNum = 3;
/*
const setTowerNums = (value) =>{
  console.log(value.target.value);
  towerNum = parseInt(value.target.value);
  return 
}
*/
const HanoiPage = () => {
  const [data, setData] = useState(initData);
  const [speed, setSpeed] = useState(1);
  const [r, setR] = useState(0);
  const [towerNums, setTowerNums] = useState(3);
  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  return (
    <div className={styles.wrapper}>
      <Hanoi data={data} speed={speed} towerNums={towerNums} />
      <div className={styles.panel} >
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>参数设置</span>
          <div className={styles.panelInput}>R值: <InputNumber className={styles.input} min={0} max={data.length} value={r} onChange={value => {setRValue(setData,value); setR(value)}} disabled={towerNums==3?true:false}/></div>
          <div className={styles.panelInput}>盘子数量: <InputNumber className={styles.input} min={1} max={64} value={data.length} onChange={value => {setData(initNewData(value)); setR(0);}}/></div>
          <div className={styles.panelInput}>动画速度: <Slider className={styles.slider} min={1} max={25} value={speed} onChange={value => { setSpeed(value); getSpeed(500 / value); }}/></div>
        </div>
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>数据统计</span>
          <p>移动步数：{AllstepNum}</p>
          <p>剖分数：{rValue}</p>
          <div className={styles.progress}><Progress percent={parseInt(NowStep*100/(AllstepNum-1))}/></div>
        </div>
        <div className={styles.panelArea}>
          <span className={styles.panelTitle}>游戏控制</span>
          <div className={styles.ButtonGroup}>
            <Button className={styles.button} icon="step-backward" size="large" type="primary" onClick={() => getPreData(setData,data)}>上一步</Button>
            <Button className={styles.button} icon="step-forward"  size="large" type="primary" onClick={() => getNextData(setData,data)}>下一步</Button>
          </div>
          <div className={`${styles.ButtonGroup} ${styles.special}`}>
            <Button className={styles.button} icon="fast-forward"  size="large" type="primary" onClick={() => playAllData(setData, data)}>播放</Button>
            <Button className={styles.button} icon="pause"  size="large" type="primary" onClick={() => banPlay()}>暂停</Button>
          </div>
          <div className={styles.radioGroup}>
            <RadioGroup onChange={value => getTowerNums(setTowerNums,value.target.value, setData)} defaultValue="3" buttonStyle="solid">
                <RadioButton value="3">三柱hanoi</RadioButton>
                <RadioButton value="4">四柱hanoi</RadioButton>
              </RadioGroup>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HanoiPage;