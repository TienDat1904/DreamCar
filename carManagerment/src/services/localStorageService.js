// CART FUNCTIONS
export const getCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

// Initialize demo user if no users exist
export const initializeDemoUser = () => {
  try {
    const users = getUsers();
    const currentUser = getCurrentUser();

    if (users.length === 0 && !currentUser) {
      const demoUser = {
        username: 'demo',
        fullName: 'Demo User',
        phone: '0000000000',
        email: 'demo@example.com',
        password: 'Demo@123',
      };

      localStorage.setItem('users', JSON.stringify([demoUser]));
      localStorage.setItem('currentUser', JSON.stringify({
        username: demoUser.username,
        fullName: demoUser.fullName,
        email: demoUser.email,
      }));

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error initializing demo user:', error);
    return false;
  }
};

export const addToCart = (car) => {
  try {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === car.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...car, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return [];
  }
};

export const removeFromCart = (id) => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return [];
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return [];
  }
};

// RENTALS FUNCTIONS
export const getRentals = () => {
  try {
    const rentals = localStorage.getItem('rentals');
    return rentals ? JSON.parse(rentals) : [];
  } catch (error) {
    console.error('Error getting rentals:', error);
    return [];
  }
};

export const addToRentals = (car) => {
  try {
    const rentals = getRentals();
    const existingItem = rentals.find(item => item.id === car.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      rentals.push({ ...car, quantity: 1 });
    }

    localStorage.setItem('rentals', JSON.stringify(rentals));
    return rentals;
  } catch (error) {
    console.error('Error adding to rentals:', error);
    return [];
  }
};

export const removeFromRentals = (id) => {
  try {
    const rentals = getRentals();
    const updatedRentals = rentals.filter(item => item.id !== id);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
    return updatedRentals;
  } catch (error) {
    console.error('Error removing from rentals:', error);
    return [];
  }
};

export const clearRentals = () => {
  try {
    localStorage.removeItem('rentals');
    return [];
  } catch (error) {
    console.error('Error clearing rentals:', error);
    return [];
  }
};

// AUTH FUNCTIONS
export const getUsers = () => {
  try {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// ✅ Updated: accepts username, fullName, phone, email, password
export const registerUser = (username, fullName, phone, email, password) => {
  try {
    const users = getUsers();

    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already taken' };
    }

    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    users.push({ username, fullName, phone, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed' };
  }
};

// ✅ Updated: login by username + password
export const loginUser = (username, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    localStorage.setItem('currentUser', JSON.stringify({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    }));
    return { success: true, user: { username: user.username, fullName: user.fullName, email: user.email } };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Login failed' };
  }
};

export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem('currentUser');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};