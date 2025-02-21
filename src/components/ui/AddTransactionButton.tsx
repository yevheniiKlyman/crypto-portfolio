import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store';
import { setIsDrawerOpenAction } from '@/store/portfolio/portfolio.slice';
import type { ButtonProps } from 'antd/es/button';

const AddTransactionButton: React.FC<ButtonProps> = ({
  children = 'Add transaction',
  ...props
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      type="primary"
      onClick={() => dispatch(setIsDrawerOpenAction(true))}
      icon={<PlusOutlined />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddTransactionButton;
