import { FC } from 'react';

import { Board } from '@/src/components/layout';
import '@/src/styles/main.scss';

const Root: FC = () => {
  return (
    <div className="route">
      <Board />
    </div>
  );
};

export default Root;
