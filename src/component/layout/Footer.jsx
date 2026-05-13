const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h5 className="mb-3">EasyMart</h5>
            <p className="text-secondary">
              Your one-stop destination for all your shopping needs.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">Electronics</li>
              <li className="mb-2">Clothing</li>
              <li className="mb-2">Home & Garden</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">support@easymart.com</li>
              <li className="mb-2">1-800-EASY-MART</li>
            </ul>
          </div>
        </div>
        <div className="pt-3 border-top border-secondary text-center text-secondary">
          <p className="mb-0">&copy; {year} EasyMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
