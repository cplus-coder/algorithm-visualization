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
  let plates = d3.select(wrapper).select(`.${styles.platesWrapper}`).selectAll('div').data(data);
  plates = state === "enter" ? plates.enter().append('div') : state === "exit" ? plates.exit() : plates;
  if (state === 'exit') {
    plates.remove();
    return;
  }
  const plateMaxWidth =  wrapper.clientWidth / 8;
  const plateMinWidth = wrapper.clientWidth / 40;
  const plateHeight = data.length <= 18? wrapper.clientHeight * 0.83 / 18 : wrapper.clientHeight * 0.83 / data.length;
  const towersPosX = [];
  let towersPosY;
  while (towerNums--) {
    const targetTower = d3.select(wrapper).select(`.tower-${3 - towerNums}`)._groups[0][0];
    towersPosX.push(targetTower.offsetLeft + targetTower.clientWidth / 2);
    towersPosY = targetTower.offsetTop;
  };
  plates
    .attr('class', styles.plate)
    .style('width', (_, index) => `${plateMaxWidth - (plateMaxWidth - plateMinWidth) * (index / data.length)}px`)
    .style('height', `${plateHeight}px`)
    .transition()
    .duration(state === 'update' ? 500 / speed: 0)
    .style('transform', (plateData, index) => `translate(${towersPosX[plateData.pillar] - (plateMaxWidth - (plateMaxWidth - plateMinWidth) * (index / data.length)) / 2}px, ${towersPosY - plateData.depth * plateHeight - plateHeight}px)`)
    // .duration(state === 'update' ? 250 : 0)
    // .style('left', (plateData, index) => `${towersPosX[plateData.pillar] - (plateMaxWidth - (plateMaxWidth - plateMinWidth) * (index / data.length)) / 2}px`)
    // .transition()
    // .duration(state === 'update' ? 250 : 0)
    // .style('top', plateData => ` ${towersPosY - plateData.depth * plateHeight - plateHeight}px`)
}

const Hanoi = ({ towerNums, data, speed }) => {
  const wrapper = useRef(null);
  const handleResize = () => renderPlate(wrapper.current, data, 'resize', towerNums, speed);
  useEffect(()=> {
    renderPlate(wrapper.current, data, 'enter', towerNums, speed);
    renderPlate(wrapper.current, data, 'update', towerNums, speed);
    renderPlate(wrapper.current, data, 'exit', towerNums, speed);
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