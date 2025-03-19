import { useMemo } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Grid } from 'antd';
import type { Breakpoint } from 'antd';
import { generateColors } from '@/utils/generateColors';
import { ChartDataItem } from '../../types/portfolioTypes';
import classes from './styles/PieChart.module.css';

interface PieChartProps {
  dataPoints: ChartDataItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
  }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.customTooltip}>
        <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const getRadius = (scr: Partial<Record<Breakpoint, boolean>>): number => {
  if (scr.xs) return 55;
  if (scr.lg) return 110;
  return 80;
};


const PieChart: React.FC<PieChartProps> = ({ dataPoints }) => {
  const screens = Grid.useBreakpoint();
  const COLORS = useMemo(() => generateColors(dataPoints.length), [dataPoints]);

  return (
    <div className={classes.pieChart}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={dataPoints}
            cx="50%"
            cy="50%"
            outerRadius={getRadius(screens)}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            label={({ label, payload }) => `${label} (${payload.value}%)`}
          >
            {dataPoints.map((entry, index) => (
              <Cell
                key={`${entry.label}-${entry.value}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
