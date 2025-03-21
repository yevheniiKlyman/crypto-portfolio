import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';

interface AppStatisticProps {
  asset: {
    name: string;
    currentTotalPrice: number;
    usdDiff: number;
  };
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
}

const AppStatistic: React.FC<AppStatisticProps> = ({
  asset,
  titleStyle,
  titleClassName = '',
  className = '',
}) => {
  return (
    <Statistic
      className={className}
      title={
        <span className={titleClassName} style={titleStyle ? titleStyle : {}}>
          {asset.name}
        </span>
      }
      value={asset.currentTotalPrice}
      precision={2}
      valueStyle={{
        color: asset.usdDiff >= 0 ? '#3f8600' : '#cf1322',
      }}
      prefix={asset.usdDiff >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="$"
    />
  );
};

export default AppStatistic;
