declare module '@canvasjs/react-charts' {
  export interface DataPoint {
    y: number;
    label: string;
  }

  export interface ChartOptions {
    theme: string;
    exportEnabled: boolean;
    animationEnabled: boolean;
    title: {
      text: string;
    };
    data: {
      type: string;
      startAngle: number;
      toolTipContent: string;
      showInLegend: boolean;
      legendText: string;
      indexLabelFontSize: number;
      indexLabel: string;
      dataPoints: DataPoint[];
    }[];
  }

  export interface CanvasJSChartProps {
    options: ChartOptions;
    onRef?: (ref: CanvasJSChart) => void;
  }

  export class CanvasJSChart extends React.Component<CanvasJSChartProps> {
    render(): JSX.Element;
  }

  export class CanvasJS extends React.Component {
    static Chart: typeof CanvasJSChart;
  }
}
