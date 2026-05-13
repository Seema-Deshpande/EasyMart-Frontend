import { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`notification-banner ${type}`}>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose} aria-label="Close notification">
        &times;
      </button>
    </div>
  );
};

export default Notification;
