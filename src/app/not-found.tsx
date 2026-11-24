import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>A different path.</h1>
        <p className="lead">
          This page doesn’t exist. Explore the portfolio to find the work you’re
          looking for.
        </p>
      </div>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </div>
  );
}
