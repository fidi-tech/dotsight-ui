import React, {useRef} from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip
} from 'recharts';

import {Module} from '@/shared/ui/Module';
import {Copyrights} from '@/shared/ui/Copyrights';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';
import {RawWidgetData} from '@/shared/api/dotsight';

import styles from './index.module.scss';
import {useEnhance} from './hocs';
import {Tooltip as CustomizedTooltip} from './components/Tooltip';
import {Legend as CustomizedLegend} from './components/Legend';
import {Tick as CustomTick} from './components/Tick';

type Props = {
  data: RawWidgetData,
}



const View = ({data}: Props) => {
  const legendContainerRef = useRef(null);
  const {items, chart, copyrights, metrics} = useEnhance(data);
  return (
    <Module className={styles.root}>
      <RadarChart outerRadius={90} width={730} height={250} data={chart}>
        <PolarGrid/>
        <PolarAngleAxis
          dataKey="metric"
          // @ts-ignore
          tick={<CustomTick external={{metrics}}/>}
        />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false}/>
        {Object.keys(items).map((item, i) =>
          <Radar
            key={item}
            name={item}
            dataKey={item}
            stroke={getColorsFromPaletteByVariant(PaletteVariant.v1)[i]}
            fill={getColorsFromPaletteByVariant(PaletteVariant.v1)[i]}
            fillOpacity={0.6}
          />,
        )}
        <Legend content={<CustomizedLegend payload={[]} external={{items, containerRef: legendContainerRef}}/>} />
        <Tooltip content={<CustomizedTooltip external={{items, metrics}}/>} />
      </RadarChart>
      <div ref={legendContainerRef} className={styles.legend} />
      <Copyrights copyrights={copyrights} className={styles.copyright} />
    </Module>
  )
}

export default View;