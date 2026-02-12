import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const LoginSignup = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = login(email, password);
      } else {
        if (!name.trim()) {
          throw new Error('Please enter your name');
        }
        result = signup(name, email, password);
      }

      if (result.success) {
        onSuccess?.();
        onClose?.();
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#666',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#f0f0f0';
            e.target.style.color = '#B71C1C';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#666';
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 15px',
            fontWeight: 'bold'
          }}>
            K
          </div>
          <h2 style={{ 
            color: '#333', 
            margin: '0 0 10px 0',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {isLogin ? 'Welcome Back 👋' : 'Join KuriousChef 🍳'}
          </h2>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            {isLogin ? 'Sign in to access all features' : 'Create your account to start cooking'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#B71C1C'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                required={!isLogin}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B71C1C'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              required
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B71C1C'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              required
            />
          </div>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '10px 15px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s',
              marginBottom: '20px'
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#B71C1C',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginSignup;