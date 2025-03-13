import { Grid } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsSiderCollapsed,
  setIsSiderCollapsedAction,
} from '@/store/layout/layout.slice';

const SiderOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const screens = Grid.useBreakpoint();
  const isSiderCollapsed = useAppSelector(selectIsSiderCollapsed);

  if (!screens.md && !isSiderCollapsed) {
    return (
      <div
        onClick={() => dispatch(setIsSiderCollapsedAction(true))}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      ></div>
    );
  }
};

export default SiderOverlay;
