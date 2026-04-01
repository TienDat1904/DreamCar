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
    
    // If no users exist, create a demo account and auto-login
    if (users.length === 0 && !currentUser) {
      const demoUser = {
        email: 'demo@example.com',
        password: 'Demo@123',
      };
      
      localStorage.setItem('users', JSON.stringify([demoUser]));
      localStorage.setItem('currentUser', JSON.stringify({ email: demoUser.email }));
      
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
      cart.push({
        ...car,
        quantity: 1,
      });
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
      rentals.push({
        ...car,
        quantity: 1,
      });
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

export const registerUser = (email, password) => {
  try {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    users.push({
      email,
      password, // In production, this should be hashed
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed' };
  }
};

export const loginUser = (email, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Save current user
    localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
    return { success: true, user: { email: user.email } };
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



