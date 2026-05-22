import { createContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulated login — assign admin role if email matches
  const login = ({ name, email }) => {
    const role = email === 'admin@easymart.com' ? 'admin' : 'user';
    setUser({ name, email, phone: '', role, addresses: [] });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateProfile = (updates) => setUser((prev) => ({ ...prev, ...updates }));

  const addAddress = (addr) =>
    setUser((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), { ...addr, _id: Date.now().toString() }],
    }));

  const updateAddress = (_id, a) =>
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((x) => (x._id === _id ? { ...x, ...a } : x)),
    }));

  const deleteAddress = (_id) =>
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((x) => x._id !== _id),
    }));

  const setDefaultAddress = (_id) =>
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((x) => ({ ...x, isDefault: x._id === _id })),
    }));

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;