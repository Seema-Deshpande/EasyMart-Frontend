import { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (!message) return;
    
    const id = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(id); // cancel if message changes before 3s
  }, [message, onClose]);

  if (!message) return null;

  const alertClass = type === 'error' || type === 'danger' ? 'alert-danger' : 'alert-success';

  return (
    <div 
      className={`alert ${alertClass} alert-dismissible fade show shadow-sm m-3`} 
      role="alert"
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close notification"></button>
    </div>
  );
};

export default Notification;
