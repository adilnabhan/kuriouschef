import React, { useState } from 'react';
import axios from 'axios';

const SpoonacularSearch = ({ onViewRecipe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [apiKey] = useState('5fca656a155a4ad7bab107e552898ae0');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setSearching(true);
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: apiKey,
          query: searchTerm,
          number: 12,
          addRecipeInformation: true,
          fillIngredients: true,
          instructionsRequired: true
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        setResults(response.data.results);
      } else {
        setResults([]);
        alert('No recipes found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      alert('Error searching recipes. Please check your API key or try again.');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const getRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        params: {
          apiKey: apiKey,
          includeNutrition: false
        }
      });

      const recipe = response.data;
      const formattedRecipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary?.replace(/<[^>]*>/g, '') || 'No description available',
        ingredients: recipe.extendedIngredients?.map(ing => 
          `• ${ing.original}`
        ).join('\n') || 'Ingredients not available',
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => 
          `${step.number}. ${step.step}`
        ).join('\n\n') || 'Instructions not available',
        prepTime: recipe.preparationMinutes || 0,
        cookTime: recipe.cookingMinutes || 0,
        difficulty: getDifficulty(recipe.readyInMinutes),
        cuisine: recipe.cuisines?.[0] || 'International',
        sourceUrl: recipe.sourceUrl
      };

      onViewRecipe(formattedRecipe);
    } catch (error) {
      console.error('Error getting recipe details:', error);
      alert('Could not load recipe details.');
    }
  };

  const getDifficulty = (totalMinutes) => {
    if (totalMinutes <= 30) return 'Easy';
    if (totalMinutes <= 60) return 'Medium';
    return 'Hard';
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 5px 30px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h2 style={{ 
            color: '#333', 
            margin: 0,
            fontSize: '28px',
            fontWeight: '700'
          }}>
            🔍 Search Recipes
          </h2>
          <p style={{ color: '#666', margin: '10px 0 0 0', fontSize: '15px' }}>
            Search 300,000+ recipes from Spoonacular API
          </p>
        </div>
      </div>
      
      {/* Search Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What would you like to cook today?"
              style={{
                width: '100%',
                padding: '18px 20px 18px 50px',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                color: '#333',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={(e) => {
                e.target.style.borderColor = '#B71C1C';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.backgroundColor = '#f8f9fa';
              }}
            />
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#B71C1C',
              fontSize: '20px'
            }}>
              🔍
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={searching || !searchTerm.trim()}
          style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #7F0000 100%)',
            color: 'white',
            padding: '18px 35px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            opacity: searching || !searchTerm.trim() ? 0.6 : 1,
            transition: 'all 0.3s',
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {searching ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Searching...
            </>
          ) : (
            'Search Recipes'
          )}
        </button>
      </div>

      {/* Quick Categories */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {[
          { icon: '🍕', text: 'Pizza', query: 'pizza' },
          { icon: '🍝', text: 'Pasta', query: 'pasta' },
          { icon: '🍗', text: 'Chicken', query: 'chicken' },
          { icon: '🥗', text: 'Salad', query: 'salad' },
          { icon: '🍰', text: 'Dessert', query: 'dessert' },
          { icon: '🥞', text: 'Breakfast', query: 'breakfast' },
          { icon: '🍛', text: 'Biryani', query: 'biryani' },
          { icon: '🍣', text: 'Sushi', query: 'sushi' }
        ].map((item) => (
          <button
            key={item.text}
            onClick={() => {
              setSearchTerm(item.query);
              handleSearch();
            }}
            style={{
              background: '#f8f9fa',
              color: '#333',
              padding: '12px 20px',
              border: '1px solid #e0e0e0',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#B71C1C';
              e.target.style.color = 'white';
              e.target.style.borderColor = '#B71C1C';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f8f9fa';
              e.target.style.color = '#333';
              e.target.style.borderColor = '#e0e0e0';
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.text}
          </button>
        ))}
      </div>

      {/* Results */}
      {searching && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 40px',
          color: '#666'
        }}>
          <div style={{
            display: 'inline-block',
            width: '60px',
            height: '60px',
            border: '3px solid rgba(183, 28, 28, 0.3)',
            borderTop: '3px solid #B71C1C',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <p style={{ margin: '15px 0', fontSize: '16px', fontWeight: '600' }}>
            Searching Spoonacular Database...
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>
            Scanning 300,000+ recipes for "{searchTerm}"
          </p>
        </div>
      )}

      {!searching && results.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h3 style={{ 
              color: '#333', 
              margin: 0,
              fontSize: '22px',
              fontWeight: '700'
            }}>
              Found {results.length} recipes for "{searchTerm}"
            </h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '25px',
            marginTop: '20px'
          }}>
            {results.map((recipe, index) => (
              <div key={recipe.id || index} style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid #e9ecef',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {recipe.image && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${recipe.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    marginBottom: '15px'
                  }} />
                )}
                
                <h4 style={{ 
                  color: '#333', 
                  margin: '0 0 10px 0',
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  {recipe.title}
                </h4>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  <span>⏱️ {recipe.readyInMinutes || 45} min</span>
                  <span>👥 {recipe.servings || 4} servings</span>
                  <span style={{
                    backgroundColor: recipe.readyInMinutes <= 30 ? '#d4edda' : 
                                    recipe.readyInMinutes <= 60 ? '#fff3cd' : '#f8d7da',
                    color: recipe.readyInMinutes <= 30 ? '#155724' : 
                           recipe.readyInMinutes <= 60 ? '#856404' : '#721c24',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {recipe.readyInMinutes <= 30 ? 'Easy' : recipe.readyInMinutes <= 60 ? 'Medium' : 'Advanced'}
                  </span>
                </div>
                
                <button
                  onClick={() => getRecipeDetails(recipe.id)}
                  style={{
                    width: '100%',
                    background: 'white',
                    color: '#B71C1C',
                    padding: '12px',
                    border: '2px solid #B71C1C',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#B71C1C';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#B71C1C';
                  }}
                >
                  View Recipe Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!searching && results.length === 0 && searchTerm && (
        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          border: '2px dashed #dee2e6',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px', color: '#B71C1C' }}>
            🔍
          </div>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '15px',
            fontSize: '22px',
            fontWeight: '700'
          }}>
            No Recipes Found
          </h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            No recipes found for "{searchTerm}". Try a different search term.
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpoonacularSearch;