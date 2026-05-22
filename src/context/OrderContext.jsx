import { createContext, useState } from 'react';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = (orderData) => {
    const newOrder = {
      _id: Date.now().toString(),
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (id) =>
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: 'Cancelled' } : o))
    );

  const updateOrderStatus = (id, status) =>
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );

  const getOrderById = (id) => orders.find((o) => o._id === id);

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );};


export default OrderContext;

