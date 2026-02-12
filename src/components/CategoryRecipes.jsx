import React from 'react';

const CategoryRecipes = ({ category, onViewRecipe, onBack }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
      marginBottom: '40px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid #e0e0e0',
            color: '#666',
            padding: '8px 15px',
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
            e.target.style.background = '#f8f9fa';
            e.target.style.color = '#B71C1C';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#666';
          }}
        >
          ← Back to Categories
        </button>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: category.color,
              color: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              {category.icon}
            </div>
            <div>
              <h2 style={{ 
                color: '#333', 
                margin: '0 0 5px 0',
                fontSize: '28px',
                fontWeight: '700'
              }}>
                {category.title}
              </h2>
              <p style={{ 
                color: '#666', 
                margin: 0,
                fontSize: '16px'
              }}>
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '25px'
      }}>
        {category.recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              background: '#f8f9fa',
              borderRadius: '15px',
              overflow: 'hidden',
              transition: 'all 0.3s',
              cursor: 'pointer',
              border: '1px solid #e9ecef'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.background = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#f8f9fa';
            }}
            onClick={() => {
              const fullRecipe = {
                ...recipe,
                ingredients: [
                  '2 cups main ingredient',
                  '1 onion, chopped',
                  '2 cloves garlic',
                  'Salt and pepper to taste',
                  'Fresh herbs',
                  '2 tbsp olive oil'
                ],
                instructions: [
                  'Prepare all ingredients',
                  'Cook main component',
                  'Add seasonings',
                  'Cook until done',
                  'Garnish and serve'
                ],
                servings: 4,
                cuisine: 'International',
                difficulty: recipe.difficulty,
                readyInMinutes: parseInt(recipe.time)
              };
              onViewRecipe(fullRecipe);
            }}
          >
            {/* Recipe Image */}
            <div style={{
              height: '200px',
              backgroundImage: `url(${recipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {recipe.time}
              </div>
            </div>

            {/* Recipe Info */}
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h3 style={{ 
                  color: '#333', 
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '700'
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
                  {recipe.difficulty}
                </span>
              </div>

              <p style={{ 
                color: '#666', 
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {recipe.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '15px',
                borderTop: '1px solid #e9ecef'
              }}>
                <span style={{
                  color: '#B71C1C',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Click to view recipe →
                </span>
                <span style={{
                  color: '#666',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{ color: '#FFD700' }}>★</span>
                  4.5
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Stats */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '15px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ 
          color: '#333', 
          margin: '0 0 15px 0',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          About {category.title}
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: category.color, fontWeight: '700' }}>
              {category.recipes.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Recipes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: category.color, fontWeight: '700' }}>
              {Math.min(...category.recipes.map(r => parseInt(r.time)))}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Quickest Recipe</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: category.color, fontWeight: '700' }}>
              4.7
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Average Rating</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', color: category.color, fontWeight: '700' }}>
              ★
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Most Popular</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryRecipes;