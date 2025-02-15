import CanvasJSReact from '@canvasjs/react-charts';
import './canvasjs.react.d.ts';
import classes from './styles/PieChart.module.css';

const { CanvasJSChart } = CanvasJSReact;

interface PieChartProps {
  dataPoints: { y: number; label: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ dataPoints }) => {
  const options = {
    theme: 'light1',
    exportEnabled: true,
    animationEnabled: true,
    backgroundColor: '#F5F5F5',
    title: {
      text: 'Crypto Asset Allocation Chart',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial',
      fontWeight: '500',
      fontSize: 24,
    },
    data: [
      {
        type: 'pie',
        startAngle: 25,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: true,
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints,
      },
    ],
  };

  return (
    <div className={classes.pieChart}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChart;
