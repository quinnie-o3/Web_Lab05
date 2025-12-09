import React, { useState } from 'react';
import './App.css';

export default function Login() {
  // Gộp input vào một state object
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Hàm xử lý khi nhập vào input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // cập nhật field động
    });
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (event) => {
    event.preventDefault(); // chặn reload
    console.log('Form data submitted:', formData);
    alert(`Logged in as ${formData.username}`);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>

    </div>
  );
}

// // Inline CSS
const styles = {
  container: {
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
    margin: '20px auto',
  },
  input: {
    width: '90%',
    padding: '8px',
    margin: '8px 0',
  },
  button: {
    padding: '8px 16px',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#672373ff',
    border: 'none',
    borderRadius: '5px',
  },
};
