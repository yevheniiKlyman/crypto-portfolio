import {
  Descriptions,
  Typography,
  Tooltip,
  Tag,
  Flex,
  Spin,
  Alert,
} from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { useGetGlobalCryptoInfoQuery } from '@store/coinlore/coinlore.api';
import classes from './styles/GlobalCryptoInfo.module.css';

const GlobalCryptoInfo: React.FC = () => {
  const { data, error, isLoading } = useGetGlobalCryptoInfoQuery(null, {
    pollingInterval: 10 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  return (
    <>
      <Typography.Title level={2} className={`${classes.title} sider-btn-margin`}>
        Global crypto&#160;
        <span style={{ display: 'inline-flex' }}>
          statistics&#160;
          <Tooltip title="According to coinlore.com">
            <InfoCircleTwoTone style={{ fontSize: '26px' }} />
          </Tooltip>
        </span>
      </Typography.Title>
      {!isLoading && !error && data && (
        <Descriptions column={1} className={classes.descriptions}>
          {data.map((item) => {
            return (
              <Descriptions.Item key={item.key} label={item.label}>
                {item.tag ? (
                  <Tag color={Number(item.children) >= 0 ? 'success' : 'error'}>
                    {item.children}%
                  </Tag>
                ) : (
                  item.children
                )}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      )}

      {isLoading && (
        <Flex justify="center" style={{ paddingTop: '2rem' }}>
          <Spin size="large" />
        </Flex>
      )}

      {error && (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      )}
    </>
  );
};

export default GlobalCryptoInfo;
