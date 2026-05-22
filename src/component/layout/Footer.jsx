const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 mt-auto" style={{ background: 'linear-gradient(90deg, #3f5efb 0%, #a141d2 100%)' }}>
      <div className="container text-center text-white">
        <div className="mb-2 d-flex align-items-center justify-content-center">
          <i className="bi bi-bag-fill me-2 fs-5"></i>
          <span className="fw-bold fs-5">EasyMart</span>
        </div>
        <p className="mb-0 small opacity-75">
          &copy; {year} EasyMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
