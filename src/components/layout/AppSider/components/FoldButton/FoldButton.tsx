import { Button } from 'antd';
import { CloseOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsSiderCollapsed,
  setIsSiderCollapsedAction,
} from '@store/layout/layout.slice';
import classes from './styles/FoldButton.module.css';

const FoldButton: React.FC = () => {
  const isSiderCollapsed = useAppSelector(selectIsSiderCollapsed);
  const dispatch = useAppDispatch();

  return (
    <Button
      icon={isSiderCollapsed ? <UnorderedListOutlined /> : <CloseOutlined />}
      className={`${classes.foldButton} ${
        isSiderCollapsed ? classes.folded : ''
      }`}
      size="large"
      color={isSiderCollapsed ? 'green' : 'danger'}
      variant="solid"
      onClick={() => {
        dispatch(setIsSiderCollapsedAction(!isSiderCollapsed));
      }}
    />
  );
};

export default FoldButton;
