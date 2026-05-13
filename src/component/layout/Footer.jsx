const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {year} EasyMart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
