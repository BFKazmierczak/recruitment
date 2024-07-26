import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div className="route">
      <h2>Explore</h2>
      <h1>Coming Soon</h1>
      <Link className="router-link" to="/">
        Take Me Back Home
      </Link>
    </div>
  );
};

export default Explore;
