import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-orange-500 text-white border-orange-600 shadow-lg';
      case 'error':
        return 'bg-red-600 text-white border-red-700 shadow-lg';
      case 'warning':
        return 'bg-yellow-500 text-black border-yellow-600 shadow-lg';
      case 'info':
        return 'bg-gray-800 text-white border-gray-900 shadow-lg';
      default:
        return 'bg-gray-800 text-white border-gray-900 shadow-lg';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
      {children}
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} getNotificationStyles={getNotificationStyles} getNotificationIcon={getNotificationIcon} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, removeNotification, getNotificationStyles, getNotificationIcon }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const styles = getNotificationStyles(notification.type);
        const icon = getNotificationIcon(notification.type);
        
        return (
          <div
            key={notification.id}
            className={`${styles} p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out animate-slide-in-right`}
            role="alert"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  {notification.message}
                </p>
                <p className="text-xs opacity-75 mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => removeNotification(notification.id)}
                  className="inline-flex text-current hover:opacity-75 focus:outline-none transition-opacity"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationContext;
