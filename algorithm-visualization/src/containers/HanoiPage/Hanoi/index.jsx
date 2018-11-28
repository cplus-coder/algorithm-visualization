import React, { memo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './index.less';

const renderTower = (towerNums) => {
  const towers = [];
  const towerWidth = 80 / towerNums;
  const pillarWidth = 1 / 16; // of towerWidth
  while (towerNums--) towers.push(
    <div key={towerNums} className={`${styles.tower} tower-${3 - towerNums}`} style={{ width: `${towerWidth}%`, height: '10%' }}>
      <div className={styles.pillar} style={{ width: `${towerWidth * pillarWidth}%`, height: '85%', transform: `translate(${(1 - pillarWidth) / 2 / pillarWidth * 100}%, -100%)` }}/>
    </div>
  );
  return towers;
}

const renderPlate = (wrapper, data, state, towerNums, speed) => {
  const plateMaxWidth =  wrapper.clientWidth / 8;
  const plateMinWidth = wrapper.clientWidth / 40;
  const plateHeight =  wrapper.clientHeight / 20;
  const towersPosX = [];
  let towersPosY;
  while (towerNums--) {
    const targetTower = d3.select(wrapper).select(`.tower-${3 - towerNums}`)._groups[0][0];
    towersPosX.push(targetTower.offsetLeft + targetTower.clientWidth / 2);
    towersPosY = targetTower.offsetTop;
  };
  let plates = d3.select(wrapper).select(`.${styles.platesWrapper}`).selectAll('div').data(data);
  plates = state === "enter" ? plates.enter().append('div') : state === "exit" ? plates.exit() : plates;
  plates
    .attr('class', styles.plate)
    .style('width', plateData => `${plateMaxWidth - (plateMaxWidth - plateMinWidth) * (plateData.index / data.length)}px`)
    .style('height', `${plateHeight}px`)
    // .transition('transform')
    // .duration(state === 'update' ? 500 : 0)
    // .style('transform', plateData => `translateX(${towersPosX[plateData.pillar] - (plateMaxWidth - (plateMaxWidth - plateMinWidth) * (plateData.index / data.length)) / 2}px)`)
    .transition('transform')
    .duration(state === 'update' ? 500 : 0)
    .style('transform', plateData => `translate(${towersPosX[plateData.pillar] - (plateMaxWidth - (plateMaxWidth - plateMinWidth) * (plateData.index / data.length)) / 2}px, ${towersPosY - plateData.depth * plateHeight - plateHeight}px)`)
}

const Hanoi = ({ towerNums, data }) => {
  const wrapper = useRef(null);
  const handleResize = () => renderPlate(wrapper.current, data, 'resize', towerNums);
  useEffect(()=> {
    renderPlate(wrapper.current, data, 'enter', towerNums);
    renderPlate(wrapper.current, data, 'update', towerNums);
    renderPlate(wrapper.current, data, 'exit', towerNums);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div ref={wrapper} className={styles.wrapper} >
      {renderTower(towerNums)}
      <div className={styles.platesWrapper} />
    </div>
  );
};

Hanoi.defaultProps = {
  towerNums: 4,
}

export default memo(Hanoi);