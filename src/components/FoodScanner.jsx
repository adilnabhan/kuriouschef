import React, { useState, useRef } from 'react';

const FoodScanner = ({ onViewRecipe, onSearchWithIngredients }) => {
  const [scanning, setScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [detected, setDetected] = useState(false);
  const [detectedFood, setDetectedFood] = useState(null);
  const fileInputRef = useRef(null);

  // Food recognition database
  const foodRecognition = {
    // Burger detection
    'burger': {
      title: 'Classic Beef Burger',
      description: 'Detected a delicious burger! Here\'s how to make it:',
      ingredients: [
        '500g ground beef (80% lean)',
        '1 onion, finely chopped',
        '2 cloves garlic, minced',
        '1 egg',
        '1/4 cup breadcrumbs',
        '1 tsp Worcestershire sauce',
        'Salt and black pepper',
        '4 burger buns',
        'Lettuce leaves',
        'Tomato slices',
        'Onion slices',
        'Cheese slices',
        'Burger sauce'
      ],
      instructions: [
        'Mix ground beef with onion, garlic, egg, breadcrumbs, and Worcestershire sauce.',
        'Season with salt and pepper, mix gently.',
        'Shape into 4 patties, make indent in center.',
        'Grill or pan-fry for 4-5 minutes per side.',
        'Add cheese in last minute if desired.',
        'Toast buns lightly.',
        'Assemble with lettuce, tomato, onion, and sauce.',
        'Serve immediately with fries.'
      ],
      time: '30 min',
      difficulty: 'Easy',
      servings: 4
    },

    // Pizza detection
    'pizza': {
      title: 'Margherita Pizza',
      description: 'Detected a pizza! Here\'s a homemade recipe:',
      ingredients: [
        '500g pizza dough',
        '400g crushed tomatoes',
        '250g fresh mozzarella',
        'Fresh basil leaves',
        '2 cloves garlic',
        'Olive oil',
        'Salt and pepper'
      ],
      instructions: [
        'Preheat oven to highest temperature.',
        'Roll out dough on floured surface.',
        'Spread tomatoes, leaving border.',
        'Add sliced mozzarella and garlic.',
        'Drizzle with olive oil.',
        'Bake for 10-12 minutes until golden.',
        'Top with fresh basil.',
        'Slice and serve hot.'
      ],
      time: '60 min',
      difficulty: 'Medium',
      servings: 4
    },

    // Salad detection
    'salad': {
      title: 'Fresh Garden Salad',
      description: 'Detected a salad! Here\'s a healthy recipe:',
      ingredients: [
        'Mixed salad greens',
        'Cherry tomatoes',
        'Cucumber',
        'Bell peppers',
        'Red onion',
        'Carrots',
        'Your choice of dressing'
      ],
      instructions: [
        'Wash and chop all vegetables.',
        'Combine in large bowl.',
        'Add your favorite dressing.',
        'Toss gently to combine.',
        'Serve immediately for freshness.',
        'Add protein like chicken or tofu if desired.'
      ],
      time: '15 min',
      difficulty: 'Easy',
      servings: 4
    },

    // Pasta detection
    'pasta': {
      title: 'Creamy Pasta',
      description: 'Detected pasta! Here\'s a creamy recipe:',
      ingredients: [
        '400g pasta',
        '2 cups heavy cream',
        '1 cup Parmesan cheese',
        '2 cloves garlic',
        'Salt and pepper',
        'Fresh parsley'
      ],
      instructions: [
        'Cook pasta al dente.',
        'Sauté garlic in pan.',
        'Add cream and simmer.',
        'Stir in Parmesan until melted.',
        'Combine with drained pasta.',
        'Season with salt and pepper.',
        'Garnish with parsley.',
        'Serve immediately.'
      ],
      time: '25 min',
      difficulty: 'Medium',
      servings: 4
    },

    // Chicken detection
    'chicken': {
      title: 'Grilled Chicken',
      description: 'Detected chicken! Here\'s how to grill it perfectly:',
      ingredients: [
        '4 chicken breasts',
        '2 lemons',
        '4 cloves garlic',
        'Olive oil',
        'Dried herbs',
        'Salt and pepper'
      ],
      instructions: [
        'Pound chicken to even thickness.',
        'Marinate with lemon, garlic, and herbs.',
        'Preheat grill to medium-high.',
        'Grill for 6-7 minutes per side.',
        'Check internal temperature (165°F).',
        'Let rest for 5 minutes.',
        'Slice and serve.',
        'Great with vegetables or salad.'
      ],
      time: '25 min',
      difficulty: 'Easy',
      servings: 4
    }
  };

  // Simulate AI food detection
  const detectFoodFromImage = (imageFile) => {
    // Mock AI detection - in real app, this would use TensorFlow.js or API
    const foodTypes = ['burger', 'pizza', 'salad', 'pasta', 'chicken'];
    const randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    return foodRecognition[randomFood];
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setDetected(false);
    setDetectedFood(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setScanning(true);
      
      // Simulate AI scanning
      setTimeout(() => {
        const detectedFood = detectFoodFromImage(file);
        setDetectedFood(detectedFood);
        setScanning(false);
        setDetected(true);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleViewRecipe = () => {
    if (detectedFood) {
      const recipe = {
        id: Date.now(),
        title: detectedFood.title,
        description: detectedFood.description,
        image: imagePreview,
        ingredients: detectedFood.ingredients.join('\n'),
        instructions: detectedFood.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n\n'),
        prepTime: 10,
        cookTime: parseInt(detectedFood.time),
        readyInMinutes: parseInt(detectedFood.time) + 10,
        servings: detectedFood.servings,
        difficulty: detectedFood.difficulty,
        cuisine: 'International',
        sourceUrl: 'https://kuriouschef.com/food-scanner'
      };
      onViewRecipe(recipe);
    }
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
        gap: '10px'
      }}>
        <div>
          <h2 style={{ 
            color: '#333', 
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📱 AI Food Scanner
          </h2>
          <p style={{ color: '#666', margin: '10px 0 0 0', fontSize: '15px' }}>
            Scan food images → Get complete recipes instantly
          </p>
        </div>
        
        <div style={{
          background: 'rgba(76, 175, 80, 0.1)',
          padding: '8px 15px',
          borderRadius: '10px',
          border: '1px solid #4CAF50',
          fontSize: '12px',
          color: '#4CAF50',
          fontWeight: 'bold'
        }}>
          🤖 Instant Recipe Generation
        </div>
      </div>

      {/* Scanner Interface */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'white'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '15px'
          }}>
            📸
          </div>
          <h4 style={{ 
            margin: '0 0 10px 0',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Take Photo
          </h4>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            opacity: 0.9
          }}>
            Use camera to scan food
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            background: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'white'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '15px'
          }}>
            🖼️
          </div>
          <h4 style={{ 
            margin: '0 0 10px 0',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Upload Image
          </h4>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            opacity: 0.9
          }}>
            Upload food photos
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {scanning && (
        <div style={{
          background: '#f8f9fa',
          borderRadius: '15px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(76, 175, 80, 0.3)',
            borderTop: '3px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: '600' }}>
            🔍 AI Scanning Food...
          </h4>
          <p style={{ color: '#666' }}>
            Analyzing image to identify food and generate recipe
          </p>
        </div>
      )}

      {detected && detectedFood && (
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '20px',
          border: '2px solid #4CAF50',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <h4 style={{ color: '#333', margin: 0, fontWeight: '700', fontSize: '20px' }}>
                ✅ Food Detected: {detectedFood.title}
              </h4>
              <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>
                AI identified your food and generated a complete recipe!
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleViewRecipe}
                style={{
                  background: '#B71C1C',
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
              >
                👁️ View Full Recipe
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {imagePreview && (
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={imagePreview} 
                  alt="Scanned Food"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '3px solid #4CAF50',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}
                />
                <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}>
                  Scanned Image
                </p>
              </div>
            )}
            
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    ⏱️ Time
                  </div>
                  <div style={{ fontSize: '18px', color: '#333', fontWeight: '700' }}>
                    {detectedFood.time}
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    📊 Difficulty
                  </div>
                  <div style={{ fontSize: '18px', color: '#333', fontWeight: '700' }}>
                    {detectedFood.difficulty}
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    👥 Servings
                  </div>
                  <div style={{ fontSize: '18px', color: '#333', fontWeight: '700' }}>
                    {detectedFood.servings}
                  </div>
                </div>
              </div>

              <h5 style={{ color: '#333', margin: '0 0 10px 0', fontWeight: '600' }}>
                Quick Preview:
              </h5>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                {detectedFood.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div style={{
        background: 'rgba(76, 175, 80, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '25px'
      }}>
        <h5 style={{ 
          color: '#2E7D32', 
          margin: '0 0 15px 0',
          fontSize: '16px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🤖 How AI Food Scanner Works:
        </h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px', color: '#4CAF50' }}>
              1️⃣
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Upload Photo
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Take or upload food image
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px', color: '#4CAF50' }}>
              2️⃣
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              AI Analysis
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Identifies food type
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px', color: '#4CAF50' }}>
              3️⃣
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Recipe Generation
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Creates complete recipe
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px', color: '#4CAF50' }}>
              4️⃣
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Cook & Enjoy
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Follow detailed instructions
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FoodScanner;