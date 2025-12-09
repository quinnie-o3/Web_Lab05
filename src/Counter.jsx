import React, {useState} from 'react';
import './index.css'

export default function Counter() {
    // hàm tăng gtri
    const [count, setCount] = useState(0);
    // hàm xử lý tăng gtri
    const handleIncrement = () => {
        setCount(count + 1);
    };
    // hàm reset gtri
    const handleReset = () => {
        setCount(0);
    };

    return (
        <div style={styles.container}>
            <h2>Counter Component</h2>
            <p>Count: {count}</p>
                <div style={styles.buttonGroup}>
                    <button onClick={handleIncrement}>Increment</button>
                    <button onClick={handleReset} style={styles.resetButton}>Reset</button>
                </div>
        </div>
    );
}

const styles = {
  container: {
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '220px',
    margin: '20px auto',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  resetButton: {
    backgroundColor: '#86267aff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};