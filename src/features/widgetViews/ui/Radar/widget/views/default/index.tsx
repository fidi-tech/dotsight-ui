import React, {useRef} from 'react';
import {
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

import {Copyrights} from '@/shared/ui/Copyrights';
import {Module} from '@/shared/ui';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';
import {useChildRatio} from '@/shared/ui/hooks/useChildRatio';
import Loader from '@/shared/ui/Loader';
import {CopyrightsRaw} from '@/shared/api/dotsight';

import {Tooltip as CustomizedTooltip} from '../../components/Tooltip';
import {Legend as CustomizedLegend} from '../../components/Legend';
import {Tick as CustomTick} from '../../components/Tick';
import {BaseProps} from '..';
import styles from './index.module.scss';

const configuration = {
    width: 2,
    height: 1,
};

type Props = BaseProps & {
    copyrights: CopyrightsRaw,
}

export const View = ({items, chart, copyrights, metrics}: Props) => {
    const rootRef = useRef(null);
    const legendContainerRef = useRef(null);
    const copyrightsContainerRef = useRef(null);
    const {ratio, isInitiated} = useChildRatio({
        parentRef: rootRef,
        extraChildrenRefs: [legendContainerRef, copyrightsContainerRef],
        parentRatio: configuration.width / configuration.height,
    });
    return (
        <Module className={styles.root} ref={rootRef}>
            <ResponsiveContainer width="100%" aspect={ratio}>
                <RadarChart outerRadius={90} data={chart}>
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
                    <Legend content={
                        <CustomizedLegend payload={[]} external={{items, containerRef: legendContainerRef}} />
                    }/>
                    <Tooltip content={<CustomizedTooltip external={{items, metrics}}/>}/>
                </RadarChart>
            </ResponsiveContainer>
            <div ref={legendContainerRef} className={styles.legend} />
            <div ref={copyrightsContainerRef}>
                <Copyrights copyrights={copyrights} className={styles.copyright} />
            </div>
            {!isInitiated && (
                <div className={styles.loader} style={{aspectRatio: configuration.width / configuration.height}}>
                    <Loader />
                </div>
            )}
        </Module>
    );
}