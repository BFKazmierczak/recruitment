import { FC } from 'react';

import { Board } from '@/src/components/layout';
import '@/src/styles/main.scss';

const Root: FC = () => {
  return (
    <div className="route">
      <h2>Dive in...</h2>
      <Board />
    </div>
  );
};

export default Root;
