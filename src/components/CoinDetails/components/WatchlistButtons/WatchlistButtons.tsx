import { useEffect } from 'react';
import { Button, notification } from 'antd';
import { DeleteOutlined, StarTwoTone } from '@ant-design/icons';
import { useUpdateWatchlistMutation } from '@/store/db/db.api';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth/auth.slice';
import classes from './styles/WatchlistButtons.module.css';

const WatchlistButtons: React.FC<{ coinId: string; watchlist: string[] }> = ({
  coinId,
  watchlist,
}) => {
  const user = useAppSelector(selectUser);
  const [
    updateWatchlist,
    { isLoading: isUpdatingWatchlist, error: watchlistUpdateError },
  ] = useUpdateWatchlistMutation();

  useEffect(() => {
    if (watchlistUpdateError) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while updating the watchlist.',
      });
    }
  }, [watchlistUpdateError]);

  return watchlist.includes(coinId) ? (
    <Button
      icon={<DeleteOutlined twoToneColor="danger" />}
      variant="outlined"
      color="danger"
      loading={isUpdatingWatchlist}
      onClick={() =>
        updateWatchlist({
          userId: user?.uid || '',
          watchlist: [...watchlist].filter((id) => id !== coinId),
        })
      }
    >
      Remove from Watchlist
    </Button>
  ) : (
    <Button
      className={classes.addButton}
      icon={<StarTwoTone />}
      variant="outlined"
      color="primary"
      loading={isUpdatingWatchlist}
      disabled={!user}
      onClick={() =>
        updateWatchlist({
          userId: user?.uid || '',
          watchlist: [...watchlist, coinId],
        })
      }
    >
      Add to Watchlist
    </Button>
  );
};

export default WatchlistButtons;
