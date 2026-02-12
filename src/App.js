import React, { useState, useEffect } from 'react';
import { useAuth } from './Contexts/AuthContext';
import SpoonacularSearch from './components/SpoonacularSearch';
import RecipeDetailModal from './components/RecipeDetailModal';
import Chatbot from './components/Chatbot';
import FoodScanner from './components/FoodScanner';
import CategoryRecipes from './components/CategoryRecipes';
import LoginSignup from './components/LoginSignup';
import './App.css';

function App() {
  const { user, logout } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
    // Load user's saved recipes
    const savedRecipes = JSON.parse(localStorage.getItem('user_recipes') || '[]');
    setUserRecipes(savedRecipes);
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/recipes/');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  // 5 Main Categories
  const categories = [
    {
      id: 1,
      title: 'BREAKFAST',
      icon: '☕',
      description: 'Start your day with energy-boosting morning meals.',
      color: '#FF6B6B',
      recipes: [
        {
          id: 101,
          title: 'Avocado Toast',
          time: '10 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?avocado-toast',
          description: 'Creamy avocado on crispy toast with seasonings.',
          rating: 4.5
        },
        {
          id: 102,
          title: 'Pancakes',
          time: '20 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?pancakes',
          description: 'Fluffy pancakes with maple syrup.',
          rating: 4.7
        },
        {
          id: 103,
          title: 'Omelette',
          time: '15 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?omelette',
          description: 'Cheese and vegetable omelette.',
          rating: 4.6
        }
      ]
    },
    {
      id: 2,
      title: 'LUNCH',
      icon: '🍽️',
      description: 'Mid-day meals to keep you productive.',
      color: '#4ECDC4',
      recipes: [
        {
          id: 201,
          title: 'Chicken Wrap',
          time: '15 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?chicken-wrap',
          description: 'Grilled chicken wrap with veggies.',
          rating: 4.4
        },
        {
          id: 202,
          title: 'Quinoa Bowl',
          time: '25 min',
          difficulty: 'Medium',
          image: 'https://source.unsplash.com/random/400x300/?quinoa-bowl',
          description: 'Healthy quinoa with roasted vegetables.',
          rating: 4.8
        },
        {
          id: 203,
          title: 'Soup',
          time: '30 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?soup',
          description: 'Warm and comforting soup.',
          rating: 4.5
        }
      ]
    },
    {
      id: 3,
      title: 'DINNER',
      icon: '🌙',
      description: 'Evening meals for family gatherings.',
      color: '#45B7D1',
      recipes: [
        {
          id: 301,
          title: 'Grilled Salmon',
          time: '25 min',
          difficulty: 'Medium',
          image: 'https://source.unsplash.com/random/400x300/?grilled-salmon',
          description: 'Perfectly grilled salmon with herbs.',
          rating: 4.9
        },
        {
          id: 302,
          title: 'Pasta',
          time: '20 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?pasta-dinner',
          description: 'Classic pasta with tomato sauce.',
          rating: 4.7
        },
        {
          id: 303,
          title: 'Stir Fry',
          time: '15 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?stir-fry',
          description: 'Quick vegetable stir fry.',
          rating: 4.6
        }
      ]
    },
    {
      id: 4,
      title: 'DESSERTS',
      icon: '🍰',
      description: 'Sweet treats to satisfy cravings.',
      color: '#FFEAA7',
      recipes: [
        {
          id: 401,
          title: 'Chocolate Cake',
          time: '45 min',
          difficulty: 'Medium',
          image: 'https://source.unsplash.com/random/400x300/?chocolate-cake',
          description: 'Rich chocolate cake with frosting.',
          rating: 4.9
        },
        {
          id: 402,
          title: 'Ice Cream',
          time: '10 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?ice-cream',
          description: 'Homemade vanilla ice cream.',
          rating: 4.8
        },
        {
          id: 403,
          title: 'Cookies',
          time: '30 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?cookies',
          description: 'Chocolate chip cookies.',
          rating: 4.7
        }
      ]
    },
    {
      id: 5,
      title: 'HEALTHY',
      icon: '🥗',
      description: 'Nutritious options for wellness.',
      color: '#55EFC4',
      recipes: [
        {
          id: 501,
          title: 'Smoothie Bowl',
          time: '10 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?smoothie-bowl',
          description: 'Nutrient-packed smoothie bowl.',
          rating: 4.6
        },
        {
          id: 502,
          title: 'Salad',
          time: '15 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?healthy-salad',
          description: 'Fresh garden salad.',
          rating: 4.5
        },
        {
          id: 503,
          title: 'Grilled Veggies',
          time: '20 min',
          difficulty: 'Easy',
          image: 'https://source.unsplash.com/random/400x300/?grilled-vegetables',
          description: 'Assorted grilled vegetables.',
          rating: 4.4
        }
      ]
    }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveSection('category-recipes');
  };

  const handleSaveRecipe = (recipe) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    const updatedRecipes = [...userRecipes, { ...recipe, savedAt: new Date().toISOString() }];
    setUserRecipes(updatedRecipes);
    localStorage.setItem('user_recipes', JSON.stringify(updatedRecipes));
  };

  const handleAddRecipe = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Open add recipe modal or page
    alert('Add recipe feature coming soon!');
  };

  return (
    <div className="App" style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      color: '#333',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* Navigation Bar */}
      <nav style={{
        background: 'white',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            K
          </div>
          <h1 style={{
            color: '#B71C1C',
            margin: 0,
            fontSize: '24px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            KURIOUSCHEF
          </h1>
        </div>

        <div style={{
          display: 'flex',
          gap: '5px',
          background: '#f8f9fa',
          padding: '5px',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          {['home', 'search', 'scan', 'recipes', 'categories'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item);
                setSelectedCategory(null);
              }}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: activeSection === item ? 'white' : 'transparent',
                color: activeSection === item ? '#B71C1C' : '#666',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s',
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeSection === item ? '0 2px 10px rgba(183, 28, 28, 0.1)' : 'none'
              }}
            >
              {item === 'home' && '🏠'}
              {item === 'search' && '🔍'}
              {item === 'scan' && '📷'}
              {item === 'recipes' && '📖'}
              {item === 'categories' && '📂'}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '2px solid #B71C1C'
                  }}
                />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Hi, {user.name}
                </span>
              </div>
              <button 
                onClick={handleAddRecipe}
                style={{
                  background: 'transparent',
                  border: '1px solid #B71C1C',
                  color: '#B71C1C',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#B71C1C';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#B71C1C';
                }}
              >
                ➕ Add Recipe
              </button>
              <button 
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid #666',
                  color: '#666',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#666';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid #B71C1C',
                  color: '#B71C1C',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#B71C1C';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#B71C1C';
                }}
              >
                👤 Login / Signup
              </button>
              <button style={{
                background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => window.open('http://localhost:8000/admin', '_blank')}
              >
                👑 Admin
              </button>
            </>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* Hero Section */}
        {activeSection === 'home' && (
          <div style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ 
                fontSize: '42px', 
                margin: '0 0 15px 0',
                fontWeight: '800',
                lineHeight: '1.2'
              }}>
                Cook Like a Pro Chef 👨‍🍳
              </h2>
              <p style={{ 
                fontSize: '18px', 
                opacity: 0.9,
                marginBottom: '30px',
                maxWidth: '600px'
              }}>
                Discover recipes, scan ingredients with AI, and get cooking assistance from ChatGPT.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveSection('search')}
                  style={{
                    background: 'white',
                    color: '#B71C1C',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  🔍 Search Recipes
                </button>
                
                <button
                  onClick={() => setActiveSection('scan')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '15px 30px',
                    border: '2px solid white',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#B71C1C';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = 'white';
                  }}
                >
                  📷 Scan Food
                </button>

                {!user && (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    style={{
                      background: 'transparent',
                      color: 'white',
                      padding: '15px 30px',
                      border: '2px solid white',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.color = '#B71C1C';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'white';
                    }}
                  >
                    👤 Join Now
                  </button>
                )}
              </div>
            </div>
            
            <div style={{
              position: 'absolute',
              right: '40px',
              top: '40px',
              fontSize: '150px',
              opacity: 0.1,
              transform: 'rotate(15deg)'
            }}>
              👨‍🍳
            </div>
          </div>
        )}

        {/* 5 Categories Section */}
        {(activeSection === 'home' || activeSection === 'categories') && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ 
                color: '#333', 
                fontSize: '28px',
                fontWeight: '700',
                margin: 0
              }}>
                🍽️ Popular Categories
              </h2>
              <button
                onClick={() => setActiveSection('categories')}
                style={{
                  background: 'transparent',
                  color: '#B71C1C',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                View All 5 Categories →
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '20px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    borderTop: `4px solid ${category.color}`,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                  }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div style={{
                    background: category.color,
                    color: 'white',
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    margin: '0 auto 15px'
                  }}>
                    {category.icon}
                  </div>
                  <h3 style={{ 
                    color: '#333', 
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '700'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}>
                    {category.description}
                  </p>
                  <div style={{
                    marginTop: '15px',
                    paddingTop: '15px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: '#999'
                  }}>
                    <span>3 recipes</span>
                    <span>•</span>
                    <span>⭐ 4.5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Recipes Page */}
        {activeSection === 'category-recipes' && selectedCategory && (
          <CategoryRecipes 
            category={selectedCategory}
            onViewRecipe={handleViewRecipe}
            onBack={() => setActiveSection('categories')}
            onSaveRecipe={handleSaveRecipe}
            user={user}
          />
        )}

        {/* Search Section */}
        {activeSection === 'search' && (
          <div style={{ marginBottom: '40px' }}>
            <SpoonacularSearch 
              onViewRecipe={handleViewRecipe} 
              onSaveRecipe={handleSaveRecipe}
              user={user}
            />
          </div>
        )}

        {/* Scanner Section */}
        {activeSection === 'scan' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <FoodScanner 
                onViewRecipe={handleViewRecipe}
                onSaveRecipe={handleSaveRecipe}
                user={user}
                onSearchWithIngredients={(ingredientsQuery) => {
                  setSearchTerm(ingredientsQuery);
                  setActiveSection('search');
                }}
              />
            </div>
          </div>
        )}

        {/* My Recipes Section */}
        {activeSection === 'recipes' && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <div>
                <h2 style={{ 
                  color: '#333', 
                  fontSize: '28px',
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  📖 My Recipes
                  {userRecipes.length > 0 && (
                    <span style={{
                      background: '#B71C1C',
                      color: 'white',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      {userRecipes.length}
                    </span>
                  )}
                </h2>
                <p style={{ color: '#666', margin: 0 }}>
                  {user ? 'Your saved and created recipes' : 'Sign in to save recipes'}
                </p>
              </div>
              
              {user ? (
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={handleAddRecipe}
                >
                  ➕ Add New Recipe
                </button>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  👤 Sign In to Save Recipes
                </button>
              )}
            </div>
            
            {!user ? (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '60px 40px',
                textAlign: 'center',
                border: '2px dashed #dee2e6'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px', color: '#B71C1C' }}>
                  🔒
                </div>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '15px', 
                  fontSize: '22px',
                  fontWeight: '700'
                }}>
                  Sign In Required
                </h3>
                <p style={{ 
                  color: '#666', 
                  marginBottom: '30px', 
                  maxWidth: '500px', 
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  Please sign in or create an account to save and view your recipes.
                </p>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '0 auto'
                  }}
                >
                  👤 Sign In / Sign Up
                </button>
              </div>
            ) : userRecipes.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '25px'
              }}>
                {userRecipes.map((recipe, index) => (
                  <div key={index} style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e9ecef',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => handleViewRecipe(recipe)}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <h3 style={{ 
                        color: '#333', 
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '700',
                        flex: 1
                      }}>
                        {recipe.title}
                      </h3>
                      <span style={{
                        background: recipe.difficulty === 'Easy' ? '#d4edda' : 
                                    recipe.difficulty === 'Medium' ? '#fff3cd' : '#f8d7da',
                        color: recipe.difficulty === 'Easy' ? '#155724' : 
                               recipe.difficulty === 'Medium' ? '#856404' : '#721c24',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {recipe.difficulty || 'Medium'}
                      </span>
                    </div>
                    
                    <p style={{ 
                      color: '#666', 
                      fontSize: '14px',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {recipe.description?.substring(0, 100)}...
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          ⏱️ {recipe.readyInMinutes || 30} min
                        </span>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          👥 {recipe.servings || 4} servings
                        </span>
                      </div>
                    </div>
                    
                    <div style={{
                      color: '#B71C1C',
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      Click to view recipe →
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '60px 40px',
                textAlign: 'center',
                border: '2px dashed #dee2e6'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px', color: '#B71C1C' }}>
                  🍳
                </div>
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '15px', 
                  fontSize: '22px',
                  fontWeight: '700'
                }}>
                  No Saved Recipes Yet
                </h3>
                <p style={{ 
                  color: '#666', 
                  marginBottom: '30px', 
                  maxWidth: '500px', 
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  Save recipes from search results or scanner to see them here!
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setActiveSection('search')}
                    style={{
                      background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                      color: 'white',
                      padding: '15px 30px',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    🔍 Search Recipes
                  </button>
                  <button 
                    onClick={() => setActiveSection('scan')}
                    style={{
                      background: 'white',
                      color: '#B71C1C',
                      padding: '15px 30px',
                      border: '2px solid #B71C1C',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    📷 Scan Food
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        padding: '40px 20px',
        marginTop: '60px',
        borderTop: '1px solid #e0e0e0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                K
              </div>
              <h4 style={{ 
                color: '#333', 
                margin: 0,
                fontSize: '18px',
                fontWeight: '700'
              }}>
                KURIOUSCHEF
              </h4>
            </div>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
              AI-powered recipe discovery with ChatGPT integration and food scanning.
            </p>
          </div>
          
          <div>
            <h5 style={{ color: '#333', marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
              Features
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'AI Food Scanner', icon: '📷' },
                { label: 'ChatGPT Assistant', icon: '🤖' },
                { label: 'Recipe Search', icon: '🔍' },
                { label: '5 Categories', icon: '📂' }
              ].map((feature) => (
                <div key={feature.label} style={{
                  color: '#666',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {feature.icon} {feature.label}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 style={{ color: '#333', marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
              Contact
            </h5>
            <div style={{ color: '#666', lineHeight: '1.8', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                📧 support@kuriouschef.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                👨‍💻 Django + React Project
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef',
          textAlign: 'center',
          color: '#999',
          fontSize: '13px'
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} KURIOUSCHEF • AI Recipe Assistant • ChatGPT Integrated
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showAuthModal && (
        <LoginSignup 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            // Refresh user recipes
            const savedRecipes = JSON.parse(localStorage.getItem('user_recipes') || '[]');
            setUserRecipes(savedRecipes);
          }}
        />
      )}

      {/* Recipe Detail Modal */}
      {isModalOpen && selectedRecipe && (
        <RecipeDetailModal 
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRecipe(null);
          }}
          onSaveRecipe={() => handleSaveRecipe(selectedRecipe)}
          user={user}
        />
      )}

      {/* Chatbot with ChatGPT */}
      <Chatbot user={user} />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #B71C1C;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #7F0000;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default App;