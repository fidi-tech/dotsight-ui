import React, {useCallback, useMemo, useRef} from 'react';
import {Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {Module} from '@/shared/ui';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';
import {Copyrights} from '@/shared/ui/Copyrights';
import {useChildRatio} from '@/shared/ui/hooks/useChildRatio';
import Loader from '@/shared/ui/Loader';
import {CopyrightsRaw} from '@/shared/api/dotsight';

import styles from './index.module.scss';
import {Tooltip as CustomizedTooltip} from '../../components/Tooltip';
import {Legend as CustomizedLegend} from '../../components/Legend';
import {formatValue, formatTime} from '../../helpers';
import {BaseProps} from '..';

export const configuration = {
    width: 2,
    height: 1,
};

type Props = BaseProps & {
    copyrights: CopyrightsRaw;
};

export const View = ({title, chart, keys, items, unitId, copyrights}: Props) => {
    const rootRef = useRef(null);
    const legendContainerRef = useRef(null);
    const copyrightsContainerRef = useRef(null);

    const {ratio, isInitiated} = useChildRatio({
        parentRef: rootRef,
        extraChildrenRefs: [legendContainerRef, copyrightsContainerRef],
        parentRatio: configuration.width / configuration.height,
    });
    const formatter = useCallback((value: number) => formatValue(value, unitId), [unitId]);
    const longestLabelLength = useMemo(() => chart
        .reduce((acc, {timestamp, ...values}) => {
            return Math.max(acc, ...Object.values(values).map(t => formatter(t).length))
        }, 0)
    , [chart, formatter]);

    return (
      <Module className={styles.root} ref={rootRef}>
          <div ref={legendContainerRef} className={styles.titleWrapper}/>
          <ResponsiveContainer width="100%" aspect={ratio}>
              <AreaChart width={700} height={230} data={chart}
                         margin={{top: 0, right: 0, bottom: 20, left: 0}}>
                  <defs>
                      {keys.map((key, i) =>
                          <linearGradient id={`color${key}`} key={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%"
                                    stopColor={getColorsFromPaletteByVariant(PaletteVariant.v1)[i]}
                                    stopOpacity={0.2}/>
                              <stop offset="55%"
                                    stopColor={getColorsFromPaletteByVariant(PaletteVariant.v1)[i]}
                                    stopOpacity={0}/>
                          </linearGradient>
                      )}
                  </defs>
                  <YAxis
                      mirror
                      tickLine={false}
                      axisLine={false}
                      type="number"
                      stroke="#dcdee1"
                      tickFormatter={formatter}
                      interval="preserveEnd"
                      textAnchor="start"
                      tick={{
                          stroke: '#79818D',
                          fill: '#79818D',
                          fontSize: '14px',
                          fontWeight: 500,
                          strokeWidth: 0
                      }}
                      tickMargin={30}
                  />
                  <XAxis
                      dataKey="timestamp"
                      interval="preserveStartEnd"
                      tickLine={false}
                      stroke="#dcdee1"
                      minTickGap={50}
                      tickFormatter={formatTime}
                      padding={{left: 20 + longestLabelLength * 12, right: 40}}
                      tick={{
                          stroke: '#79818D',
                          fill: '#79818D',
                          fontSize: '14px',
                          fontWeight: 500,
                          strokeWidth: 0
                      }}
                  />
                  <Tooltip content={<CustomizedTooltip external={{items, formatter}}/>}/>
                  <Legend
                      verticalAlign="top"
                      align="left"
                      iconType="plainline"
                      content={<CustomizedLegend payload={[]} external={{
                          title,
                          items,
                          containerRef: legendContainerRef
                      }}/>}
                      wrapperStyle={{position: 'relative'}}
                  />
                  {keys.map((key, i) =>
                      <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={getColorsFromPaletteByVariant(PaletteVariant.v1)[i]}
                          strokeWidth={2}
                          activeDot={{
                              stroke: getColorsFromPaletteByVariant(PaletteVariant.v1)[i],
                              strokeWidth: 2,
                              r: 2
                          }}
                          dot={{
                              strokeWidth: 0,
                              r: 1,
                              fill: getColorsFromPaletteByVariant(PaletteVariant.v1)[i]
                          }}
                          fillOpacity={1}
                          connectNulls
                          fill={`url(#color${key})`}
                      />
                  )}
              </AreaChart>
          </ResponsiveContainer>
          <div ref={copyrightsContainerRef}>
              <Copyrights copyrights={copyrights} className={styles.copyright}/>
          </div>
          {!isInitiated && (
              <div className={styles.loader} style={{aspectRatio: configuration.width / configuration.height}}>
                  <Loader />
              </div>
          )}
      </Module>
    )
}