import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container py-5 text-center">
            <div className="py-5">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="text-muted mb-5">The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="btn btn-primary btn-lg px-5 fw-bold">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
