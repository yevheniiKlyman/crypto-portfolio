import { Button } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsSiderCollapsed,
  setIsSiderCollapsedAction,
} from '@/store/layout/layout.slice';
import classes from './styles/FoldButton.module.css';

const FoldButton: React.FC = () => {
  const isSiderCollapsed = useAppSelector(selectIsSiderCollapsed);
  const dispatch = useAppDispatch();

  return (
    <Button
      icon={<UnorderedListOutlined />}
      className={classes.foldButton}
      size="large"
      color="green"
      variant="solid"
      onClick={() => {
        dispatch(setIsSiderCollapsedAction(!isSiderCollapsed));
      }}
    />
  );
};

export default FoldButton;
