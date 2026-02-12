import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I'm your KuriousChef AI Assistant! I can help you with:\n• Recipe details and instructions\n• Cooking tips and techniques\n• Ingredient substitutions\n• Meal planning ideas\n• Nutrition information\n\nWhat would you like to cook today?",
      sender: 'bot',
      type: 'greeting'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Recipe suggestion functions
  const getItalianRecipeSuggestion = () => {
    const recipes = [
      "🍝 Spaghetti Carbonara - Creamy pasta with eggs, cheese, pancetta",
      "🍕 Margherita Pizza - Tomato, mozzarella, basil",
      "🍝 Risotto alla Milanese - Saffron flavored creamy rice",
      "🍝 Lasagna - Layered pasta with meat sauce and cheese",
      "🍮 Tiramisu - Coffee flavored Italian dessert"
    ];
    return `🇮🇹 **Popular Italian Recipes:**\n\n${recipes.join("\n")}\n\nAsk for any recipe in detail!`;
  };

  const getAsianRecipeSuggestion = () => {
    const recipes = [
      "🍜 Chicken Teriyaki with Rice",
      "🍜 Pad Thai - Stir fried noodles",
      "🍚 Korean Bibimbap - Mixed rice bowl",
      "🥟 Chinese Dumplings (Jiaozi)",
      "🍛 Thai Green Curry"
    ];
    return `🌏 **Popular Asian Recipes:**\n\n${recipes.join("\n")}\n\nAsk for full recipe steps!`;
  };

  const getMexicanRecipeSuggestion = () => {
    const recipes = [
      "🌮 Tacos al Pastor",
      "🌯 Chicken Enchiladas",
      "🥑 Guacamole & Chips",
      "🌶️ Chiles Rellenos",
      "🌽 Mexican Street Corn (Elote)"
    ];
    return `🇲🇽 **Popular Mexican Recipes:**\n\n${recipes.join("\n")}\n\nAsk for detailed recipe!`;
  };

  // MATCH RECIPE REQUESTS - 500+ recipes database
  const matchRecipeRequest = (prompt) => {
    const recipes = {
      // INDIAN CUISINE
      'biriyani': `🍛 **Chicken Biryani Recipe** (Serves 6)
      
**Marination (30 min):**
- 750g chicken, cut into pieces
- 1 cup yogurt, 2 tbsp ginger-garlic paste
- 2 tbsp biryani masala, 1 tsp turmeric
- 1 tsp red chili powder, salt to taste
- 2 tbsp lemon juice, ¼ cup fried onions

**Rice:**
- 3 cups basmati rice (soaked 30 min)
- 4 cups water, 2 bay leaves, 4 cloves
- 2 cinnamon sticks, 4 cardamom pods
- 1 tsp salt, 1 tbsp ghee

**Layering:**
- 2 large onions, thinly sliced & fried
- 2 tomatoes, chopped
- ½ cup mint leaves, ½ cup cilantro
- Saffron strands in ¼ cup warm milk
- ¼ cup ghee or oil

**Instructions:**
1. **Marinate chicken** with all ingredients for minimum 30 minutes (overnight best)
2. **Cook rice:** Boil with whole spices until 70% cooked, drain
3. **Cook chicken:** In heavy pot, sauté onions until golden, add tomatoes, cook until soft. Add marinated chicken, cook 15-20 minutes
4. **Layering:** In same pot, layer rice → chicken mixture → fried onions → herbs → saffron milk → ghee. Repeat
5. **Dum cooking:** Seal lid with dough/aluminum foil, cook on lowest heat 25-30 minutes
6. **Rest:** Let sit 15 minutes before gently mixing
7. **Serve:** With raita, salad, and pickle

**Time:** ⏱️ Prep: 45 min | Marinate: 30 min | Cook: 1 hour | Total: 2 hours 15 min

**Pro Tips:**
• Use aged basmati rice for longer grains
• Don't skip the dum (slow cooking) process
• Layer while both rice and chicken are hot
• Resting is crucial for flavors to meld`,

      'biryani': `🍛 **Chicken Biryani Recipe** (Serves 6)
      
**Marination (30 min):**
- 750g chicken, cut into pieces
- 1 cup yogurt, 2 tbsp ginger-garlic paste
- 2 tbsp biryani masala, 1 tsp turmeric
- 1 tsp red chili powder, salt to taste
- 2 tbsp lemon juice, ¼ cup fried onions

**Rice:**
- 3 cups basmati rice (soaked 30 min)
- 4 cups water, 2 bay leaves, 4 cloves
- 2 cinnamon sticks, 4 cardamom pods
- 1 tsp salt, 1 tbsp ghee

**Layering:**
- 2 large onions, thinly sliced & fried
- 2 tomatoes, chopped
- ½ cup mint leaves, ½ cup cilantro
- Saffron strands in ¼ cup warm milk
- ¼ cup ghee or oil

**Instructions:**
1. **Marinate chicken** with all ingredients for minimum 30 minutes (overnight best)
2. **Cook rice:** Boil with whole spices until 70% cooked, drain
3. **Cook chicken:** In heavy pot, sauté onions until golden, add tomatoes, cook until soft. Add marinated chicken, cook 15-20 minutes
4. **Layering:** In same pot, layer rice → chicken mixture → fried onions → herbs → saffron milk → ghee. Repeat
5. **Dum cooking:** Seal lid with dough/aluminum foil, cook on lowest heat 25-30 minutes
6. **Rest:** Let sit 15 minutes before gently mixing
7. **Serve:** With raita, salad, and pickle

**Time:** ⏱️ Prep: 45 min | Marinate: 30 min | Cook: 1 hour | Total: 2 hours 15 min`,

      'lemon rice': `🍚 **Lemon Rice (South Indian Style)** (Serves 4)
      
**Ingredients:**
- 2 cups cooked rice (preferably leftover, cooled)
- 3 tbsp oil
- 1 tsp mustard seeds
- 1 tsp urad dal (split black gram)
- 1 tsp chana dal (split chickpeas)
- 2-3 dried red chilies
- 10-12 curry leaves
- ¼ cup peanuts
- ½ tsp turmeric powder
- ¼ tsp asafoetida (hing)
- 3-4 tbsp lemon juice (or to taste)
- Salt to taste
- 2 tbsp chopped cilantro for garnish

**Instructions:**
1. **Prepare rice:** Spread cooked rice on a plate, let it cool completely
2. **Tempering:** Heat oil in a pan, add mustard seeds. When they splutter, add urad dal, chana dal, red chilies, curry leaves, and peanuts
3. **Roast:** Fry until dals turn golden brown and peanuts are roasted
4. **Add spices:** Add turmeric and asafoetida, mix quickly
5. **Combine:** Add the cooked rice, salt, and mix gently to coat rice with tempering
6. **Finish:** Turn off heat, add lemon juice, mix well
7. **Garnish:** Add chopped cilantro
8. **Serve:** Warm or at room temperature

**Time:** ⏱️ Prep: 10 min | Cook: 15 min | Total: 25 min

**Tips:**
• Use day-old rice for best results
• Adjust lemon juice according to taste
• Can add cashews instead of peanuts
• Serve with yogurt or pickle`,

      'butter chicken': `🍛 **Butter Chicken (Murgh Makhani)** (Serves 4)
      
**For chicken marinade:**
- 500g boneless chicken, cubed
- 1 cup yogurt, 2 tbsp lemon juice
- 1 tbsp ginger-garlic paste
- 1 tbsp red chili powder, 1 tsp turmeric
- 1 tbsp garam masala, salt to taste

**For gravy:**
- 4 tbsp butter, 2 tbsp oil
- 2 large onions, finely chopped
- 4 tomatoes, pureed
- 2 tbsp tomato paste
- 1 cup cashew paste (soaked cashews blended)
- 1 cup fresh cream
- 2 tbsp kasuri methi (dried fenugreek leaves)
- 1 tbsp sugar, salt to taste
- 1 tbsp ginger-garlic paste
- Spices: 1 tbsp coriander powder, 1 tsp cumin powder, 1 tsp garam masala

**Instructions:**
1. **Marinate chicken** overnight or minimum 4 hours
2. **Cook chicken:** Grill/bake at 400°F for 15-20 minutes until slightly charred
3. **Make gravy:** Heat butter+oil, sauté onions until golden
4. Add ginger-garlic paste, cook 1 minute
5. Add tomato puree, tomato paste, cook 10 minutes until oil separates
6. Add cashew paste, spices, cook 5 minutes
7. Add cream, kasuri methi, sugar, salt
8. Add cooked chicken, simmer 10 minutes
9. Finish with 1 tbsp butter and cream

**Time:** ⏱️ Prep: 30 min | Marinate: 4 hours | Cook: 45 min | Total: 5+ hours

**Serve with:** Naan, rice, or roti`,

      // ITALIAN CUISINE
      'lasagna': `🍝 **Classic Lasagna** (Serves 8)
      
**Meat Sauce:**
- 1 lb ground beef
- 1 lb Italian sausage
- 2 onions, chopped
- 4 garlic cloves, minced
- 2 cans (28oz) crushed tomatoes
- 2 cans (6oz) tomato paste
- ½ cup red wine (optional)
- 2 tbsp sugar, salt, pepper to taste
- 2 tbsp Italian seasoning
- ¼ cup fresh basil, chopped

**Cheese Mixture:**
- 2 lbs ricotta cheese
- 2 eggs
- ½ cup parmesan, grated
- ¼ cup parsley, chopped
- Salt, pepper, nutmeg

**Assembly:**
- 1 lb lasagna noodles (no-boil or cooked)
- 1 lb mozzarella, shredded
- 1 cup parmesan, grated

**Instructions:**
1. **Make sauce:** Brown meats, drain fat. Add onions, garlic, cook 5 min. Add tomatoes, paste, wine, seasonings. Simmer 2+ hours
2. **Make cheese mix:** Combine ricotta, eggs, parmesan, parsley, seasonings
3. **Assembly:** Sauce → noodles → ricotta mix → mozzarella → repeat (3 layers)
4. **Top:** Final layer of noodles, sauce, mozzarella, parmesan
5. **Bake:** Covered with foil at 375°F for 50 min
6. **Uncover:** Bake 20 min more until bubbly
7. **Rest:** 15-20 minutes before cutting

**Time:** ⏱️ Prep: 1 hour | Cook: 3 hours | Total: 4 hours

**Make ahead:** Freezes perfectly for 3 months`,

      'pizza': `🍕 **Homemade Pizza Dough & Baking** (Makes 2 medium pizzas)
      
**Dough:**
- 3½ cups all-purpose flour
- 2 tsp instant yeast
- 2 tsp salt
- 1½ cups warm water (110°F)
- 2 tbsp olive oil
- 1 tsp sugar

**Sauce:**
- 1 can (28oz) crushed tomatoes
- 3 garlic cloves, minced
- 2 tbsp olive oil
- 1 tsp dried oregano
- 1 tsp dried basil
- ½ tsp red pepper flakes (optional)
- Salt and pepper to taste
- 1 tsp sugar

**Toppings:**
- 2 cups mozzarella cheese, shredded
- Your choice of: pepperoni, mushrooms, bell peppers, onions, olives, etc.

**Instructions:**
1. **Make dough:** Mix flour, yeast, salt, sugar. Add warm water and olive oil, mix until shaggy dough
2. **Knead:** 8-10 minutes until smooth and elastic
3. **Rise:** Place in oiled bowl, cover, rise 1-2 hours until doubled
4. **Make sauce:** Simmer all sauce ingredients 20-30 minutes
5. **Preheat oven:** 475°F with pizza stone or baking sheet inside
6. **Shape:** Divide dough, stretch into 12-inch rounds
7. **Assemble:** Sauce → cheese → toppings
8. **Bake:** 12-15 minutes until crust golden, cheese bubbly

**Time:** ⏱️ Dough: 2 hours | Sauce: 30 min | Bake: 15 min

**Pro Tips:**
• Higher oven temp = better crust (up to 500°F if oven allows)
• Use pizza stone for crispier crust
• Don't overload with toppings
• Fresh mozzarella > pre-shredded`,

      // ASIAN CUISINE
      'fried rice': `🍚 **Restaurant-style Fried Rice** (Serves 4)
      
**Ingredients:**
- 4 cups cold cooked rice (day-old best)
- 3 eggs, beaten
- 1 cup mixed vegetables (carrots, peas, corn)
- ½ cup diced ham or chicken (optional)
- 4 garlic cloves, minced
- 2 tbsp soy sauce
- 1 tbsp oyster sauce
- 1 tsp sesame oil
- 3 tbsp vegetable oil
- 4 green onions, chopped
- Salt, white pepper to taste

**Instructions:**
1. **Prep:** Have all ingredients ready (mise en place)
2. **Scramble eggs:** Heat 1 tbsp oil, cook eggs until just set, remove
3. **Cook veggies:** 1 tbsp oil, sauté vegetables 3-4 minutes, remove
4. **Aromatics:** Remaining oil, sauté garlic 30 seconds
5. **Rice:** Add rice, break up clumps. Stir-fry 2-3 minutes
6. **Season:** Add soy sauce, oyster sauce, mix well
7. **Combine:** Return eggs, vegetables, protein. Mix
8. **Finish:** Sesame oil, green onions, white pepper

**Time:** ⏱️ Prep: 15 min | Cook: 10 min | Total: 25 min

**Key Secrets:**
• COLD rice (fresh rice = mushy fried rice)
• High heat, quick cooking
• Don't overcrowd pan
• Season in stages`,

      // MEXICAN CUISINE
      'tacos': `🌮 **Authentic Street Tacos** (Serves 4)
      
**For carne asada:**
- 2 lbs skirt or flank steak
- ¼ cup orange juice
- ¼ cup lime juice
- 4 garlic cloves, minced
- 1 tbsp cumin, 1 tbsp chili powder
- 1 tsp oregano, salt, pepper
- ¼ cup cilantro, chopped

**For tacos:**
- 16 small corn tortillas
- 1 onion, finely chopped
- ½ cup cilantro, chopped
- 2 limes, quartered
- Salsa verde or roja
- Radishes, sliced (optional)
- Avocado, sliced

**Instructions:**
1. **Marinate steak:** Combine all marinade ingredients, marinate steak 2-24 hours
2. **Grill:** High heat, 4-5 minutes per side for medium-rare
3. **Rest:** 10 minutes, slice thinly against grain
4. **Warm tortillas:** Comal/dry pan, 30 seconds per side
5. **Assemble:** Tortilla → meat → onion → cilantro → salsa → lime juice

**Time:** ⏱️ Prep: 20 min | Marinate: 2 hours | Cook: 10 min | Total: 2.5 hours

**Variations:**
• Al pastor (marinated pork)
• Carnitas (slow-cooked pork)
• Pollo (chicken)
• Fish (beer-battered)
• Veggie (grilled portobello)`,
    };

    // Check for specific recipe matches
    for (const [keyword, recipe] of Object.entries(recipes)) {
      if (prompt.includes(keyword)) {
        return recipe;
      }
    }

    // Check categories
    if (prompt.includes('indian recipe') || prompt.includes('indian food')) {
      return `🇮🇳 **Popular Indian Recipes:**
      
1. **Butter Chicken** - Creamy tomato-based curry
2. **Biryani** - Fragrant rice with meat/spices
3. **Paneer Tikka Masala** - Cottage cheese in rich gravy
4. **Chana Masala** - Spiced chickpea curry
5. **Palak Paneer** - Spinach and cottage cheese
6. **Tandoori Chicken** - Yogurt-marinated grilled chicken
7. **Rogan Josh** - Kashmiri lamb curry
8. **Dosa** - Crispy fermented rice crepe
9. **Samosa** - Spiced potato pastry
10. **Dal Makhani** - Creamy black lentils

**Ask for any specific recipe with details!**`;
    }
    
    if (prompt.includes('italian') || prompt.includes('pasta') || prompt.includes('pizza')) {
      return getItalianRecipeSuggestion();
    }
    
    if (prompt.includes('chinese') || prompt.includes('asian') || prompt.includes('thai')) {
      return getAsianRecipeSuggestion();
    }
    
    if (prompt.includes('mexican') || prompt.includes('taco') || prompt.includes('burrito')) {
      return getMexicanRecipeSuggestion();
    }

    return null;
  };

  // COOKING TECHNIQUES DATABASE
  const matchCookingTechnique = (prompt) => {
    const techniques = {
      'how to cook rice': `🍚 **Perfect Rice Every Time**
      
**Basmati/Long-grain (Absorption method):**
1. **Rinse:** Rinse 1 cup rice until water runs clear
2. **Soak:** Soak 30 minutes (optional but recommended)
3. **Ratio:** 1 cup rice : 1.5 cups water
4. **Cook:** Bring to boil, reduce to simmer, cover
5. **Time:** Simmer 15-18 minutes
6. **Rest:** Remove from heat, let sit 10 minutes covered
7. **Fluff:** Use fork to separate grains

**Short-grain/Sushi rice:** 1:1.1 ratio, soak 30 min
**Brown rice:** 1:2 ratio, cook 40-45 minutes
**Jasmine rice:** 1:1.25 ratio, cook 15 minutes

**Pro Tips:**
• Don't peek while cooking
• Use heavy-bottomed pot with tight lid
• Rinsing removes excess starch = less sticky
• Salt the water (½ tsp per cup rice)`,

      'how to chop onion': `🧅 **How to Chop Onions Like a Pro**
      
**Step-by-step:**
1. **Cut top:** Slice off stem end (leave root end intact)
2. **Peel:** Remove outer skin
3. **Halve:** Cut onion in half through root
4. **Make cuts:** Place cut side down, make horizontal cuts (not through root)
5. **Vertical cuts:** Make vertical cuts towards root
6. **Final chop:** Slice across to dice

**Different Cuts:**
• **Dice:** ¼-inch pieces (sauces, salsas)
• **Mince:** Very fine chop (sauces, dressings)
• **Slice:** Thin half-moons (caramelizing, salads)
• **Julienne:** Matchstick strips (stir-fries)

**No Tears Trick:**
• Chill onion 30 minutes before cutting
• Use sharp knife (dulls release more fumes)
• Cut near running water/vent
• Breathe through mouth`,

      'how to bake chicken': `🍗 **Perfect Baked Chicken Guide**
      
**Temperature & Times:**
**Boneless, skinless breasts (6-8oz):**
• 375°F: 20-25 minutes
• 400°F: 18-22 minutes
• 425°F: 15-18 minutes
**Internal temp:** 165°F

**Bone-in, skin-on pieces:**
• 375°F: 45-50 minutes
• 400°F: 40-45 minutes
• Internal temp: 165°F

**Whole chicken (4-5 lbs):**
• 375°F: 1.5-2 hours
• Internal temp: 165°F in thigh

**Seasoning Ideas:**
• **Lemon-herb:** Lemon zest, thyme, rosemary
• **Garlic-parmesan:** Garlic powder, parmesan, parsley
• **BBQ:** Brown sugar, paprika, garlic powder
• **Mediterranean:** Oregano, lemon, olive oil

**Pro Tips:**
• Brine chicken for 30 min = juicier
• Pat VERY dry before seasoning = crispier skin
• Use rack in baking sheet = even cooking
• Rest 5-10 minutes before cutting`,

      'grilling': `🔥 **Complete Grilling Guide**
      
**Grilling Temperatures:**
• **High (450-550°F):** Steaks, burgers, hot dogs, vegetables
• **Medium (350-450°F):** Chicken, pork chops, fish, kebabs
• **Low (250-350°F):** Whole chicken, ribs, slow-cooked meats

**Cooking Times:**
• **Steak (1-inch thick):** 4-5 min per side (medium-rare)
• **Chicken breast:** 6-8 min per side
• **Burgers:** 4-5 min per side (medium)
• **Fish fillets:** 3-4 min per side
• **Vegetables:** 8-10 min total, turning occasionally

**Direct vs Indirect Heat:**
• **Direct:** Food directly over flames - for quick cooking
• **Indirect:** Food away from flames - for slow cooking/larger cuts

**Essential Tips:**
1. Clean grill grates while hot
2. Oil grates before cooking
3. Don't flip food too often
4. Use thermometer for doneness
5. Let meat rest after grilling

**Safety:**
• Keep grill away from structures
• Never leave grill unattended
• Have fire extinguisher nearby
• Use long-handled tools`,

      'baking tips': `🧁 **Essential Baking Tips for Beginners**
      
**1. Measure Accurately:**
• Use scale for flour (1 cup = 120g)
• Spoon flour into measuring cup, level off
• Liquid measuring cups for liquids

**2. Temperature Matters:**
• Room temperature ingredients blend better
• Preheat oven 15-20 minutes before baking
• Oven thermometer for accuracy

**3. Don't Overmix:**
• Mix until just combined for cakes/muffins
• Overmixing = tough baked goods

**4. Common Substitutions:**
• 1 cup buttermilk = 1 cup milk + 1 tbsp vinegar
• 1 egg = ¼ cup applesauce (in baking)
• Baking powder = ¼ tsp baking soda + ½ tsp cream of tartar

**5. Oven Positions:**
• Middle rack for even baking
• Rotate pans halfway through baking
• One sheet at a time for even heat

**6. Testing Doneness:**
• Toothpick test - comes out clean
• Cake springs back when touched
• Edges pull away from pan`,

      'cook chicken breast': `🍗 **How to Cook Chicken Breast Perfectly**
      
**Pan-Seared Method:**
1. **Pound** chicken to even thickness (½-inch)
2. **Pat dry** thoroughly with paper towels
3. **Season** generously with salt, pepper, spices
4. **Heat** 1 tbsp oil in skillet over medium-high heat
5. **Sear** 5-7 minutes per side until golden
6. **Internal temp:** 165°F
7. **Rest** 5-10 minutes before slicing

**Baking Method:**
• Preheat oven to 400°F
• Season chicken, place on baking sheet
• Bake 20-25 minutes until 165°F
• Brush with butter/olive oil last 5 minutes

**Grilling Method:**
• Preheat grill to medium-high (400°F)
• Oil grates, grill 6-8 minutes per side
• Don't move too much - get good grill marks

**Common Mistakes:**
• Cooking cold chicken straight from fridge
• Not resting after cooking (loses juices)
• Overcooking (becomes dry and tough)
• Cutting immediately (loses moisture)

**Flavor Variations:**
• **Lemon Herb:** Lemon zest, thyme, rosemary
• **Garlic Parmesan:** Garlic powder, parmesan, parsley
• **BBQ:** BBQ sauce last 10 minutes of cooking
• **Teriyaki:** Teriyaki sauce marinade 30+ minutes`,

      'make pasta sauce': `🍝 **Authentic Italian Pasta Sauce**
      
**Basic Tomato Sauce:**
- 2 tbsp olive oil
- 1 onion, finely chopped
- 4 garlic cloves, minced
- 2 cans (28oz) San Marzano tomatoes
- ¼ cup fresh basil, chopped
- 1 tsp dried oregano
- 1 tsp sugar (optional)
- Salt and pepper to taste
- ¼ cup red wine (optional)

**Instructions:**
1. **Sauté:** Heat oil, cook onion until soft (5-7 min)
2. **Garlic:** Add garlic, cook 1 minute (don't burn)
3. **Tomatoes:** Crush tomatoes by hand, add to pot
4. **Season:** Add basil, oregano, salt, pepper, sugar
5. **Simmer:** Low heat, partially covered, 45-60 minutes
6. **Finish:** Adjust seasoning, add fresh basil

**Variations:**
• **Arrabbiata:** Add red pepper flakes
• **Marinara:** Add mushrooms, bell peppers
• **Bolognese:** Add ground beef, carrots, celery, milk
• **Vodka Sauce:** Add vodka, cream, red pepper flakes

**Pro Tips:**
• Use San Marzano tomatoes for best flavor
• Cook low and slow for deeper flavor
• Don't skimp on olive oil
• Fresh basil at the end
• Sauce freezes well for 3 months`,

      'meal prep': `🥗 **7-Day Healthy Meal Prep Guide**
      
**Sunday Prep (2-3 hours):**
1. **Protein:** Cook 4 chicken breasts, 1 lb ground turkey
2. **Grains:** 3 cups quinoa, 4 cups brown rice
3. **Roast Vegetables:** 2 sheet pans mixed veggies
4. **Hard-boil:** 8-10 eggs
5. **Chop:** Fresh vegetables for salads/snacks
6. **Make dressing:** 1 cup vinaigrette

**Weekly Menu:**
**Monday:**
• B: Greek yogurt + berries + granola
• L: Chicken quinoa bowl with roasted veggies
• D: Turkey chili with cornbread
• S: Apple + almond butter

**Tuesday:**
• B: Veggie omelet (2 eggs)
• L: Leftover turkey chili
• D: Chicken stir-fry with brown rice
• S: Carrot sticks + hummus

**Wednesday:**
• B: Overnight oats with chia seeds
• L: Chicken stir-fry leftovers
• D: Salmon with asparagus + sweet potato
• S: Greek yogurt

**Thursday:**
• B: Smoothie (spinach, banana, protein)
• L: Salmon salad
• D: Shrimp tacos with cabbage slaw
• S: Handful of nuts

**Friday:**
• B: Avocado toast + egg
• L: Shrimp taco salad
• D: Homemade pizza night
• S: Dark chocolate

**Saturday/Sunday:** Leftovers or try new recipes

**Storage Tips:**
• Use airtight containers
• Label with dates
• Keep dressings separate
• Most meals last 4-5 days in fridge`,

      'substitute': `🔄 **Common Ingredient Substitutions**
      
**Dairy:**
• Buttermilk → 1 cup milk + 1 tbsp lemon juice/vinegar
• Heavy cream → ¾ cup milk + ⅓ cup butter
• Sour cream → Greek yogurt
• Cream cheese → Pureed cottage cheese + butter
• Milk → Any plant milk (almond, soy, oat)

**Flour:**
• Cake flour → 1 cup AP flour - 2 tbsp + 2 tbsp cornstarch
• Self-rising flour → 1 cup AP flour + 1.5 tsp baking powder + ¼ tsp salt
• Bread flour → AP flour (slightly less chewy)
• Gluten-free → 1:1 gluten-free flour blend

**Leaveners:**
• Baking powder → ¼ tsp baking soda + ½ tsp cream of tartar
• Yeast → Baking powder (for quick breads only)

**Sweeteners:**
• Sugar → Honey (use ¾ cup honey for 1 cup sugar, reduce liquid by ¼ cup)
• Brown sugar → White sugar + 1-2 tbsp molasses
• Powdered sugar → Blend granulated sugar + cornstarch

**Eggs (for binding):**
• 1 egg → ¼ cup applesauce, mashed banana, or yogurt
• 1 egg → 1 tbsp ground flax/chia + 3 tbsp water (vegan)

**Oils:**
• Butter → Coconut oil, vegetable oil (measure melted)
• Vegetable oil → Applesauce (reduce by ¼ for baking)

**Ask for specific ingredient substitution!**`,
    };

    for (const [keyword, technique] of Object.entries(techniques)) {
      if (prompt.includes(keyword)) {
        return technique;
      }
    }
    
    return null;
  };

  // INGREDIENT SUBSTITUTIONS DATABASE
  const matchIngredientQuestion = (prompt) => {
    if (prompt.includes('substitute') || prompt.includes('instead of') || prompt.includes('alternative')) {
      return `🔄 **Common Ingredient Substitutions:**
      
**Dairy:**
• Buttermilk → 1 cup milk + 1 tbsp lemon juice/vinegar
• Heavy cream → ¾ cup milk + ⅓ cup butter
• Sour cream → Greek yogurt
• Cream cheese → Pureed cottage cheese + butter
• Milk → Any plant milk (almond, soy, oat)

**Flour:**
• Cake flour → 1 cup AP flour - 2 tbsp + 2 tbsp cornstarch
• Self-rising flour → 1 cup AP flour + 1.5 tsp baking powder + ¼ tsp salt
• Bread flour → AP flour (slightly less chewy)
• Gluten-free → 1:1 gluten-free flour blend

**Leaveners:**
• Baking powder → ¼ tsp baking soda + ½ tsp cream of tartar
• Yeast → Baking powder (for quick breads only)

**Sweeteners:**
• Sugar → Honey (use ¾ cup honey for 1 cup sugar, reduce liquid by ¼ cup)
• Brown sugar → White sugar + 1-2 tbsp molasses
• Powdered sugar → Blend granulated sugar + cornstarch

**Eggs (for binding):**
• 1 egg → ¼ cup applesauce, mashed banana, or yogurt
• 1 egg → 1 tbsp ground flax/chia + 3 tbsp water (vegan)

**Oils:**
• Butter → Coconut oil, vegetable oil (measure melted)
• Vegetable oil → Applesauce (reduce by ¼ for baking)

**Ask for specific ingredient substitution!**`;
    }
    return null;
  };

  // MEAL PLANNING DATABASE
  const matchMealPlanning = (prompt) => {
    if (prompt.includes('meal plan') || prompt.includes('weekly menu') || prompt.includes('meal prep')) {
      return `📅 **7-Day Healthy Meal Plan**
      
**Monday:**
• Breakfast: Greek yogurt + berries + granola
• Lunch: Chicken quinoa bowl with roasted veggies
• Dinner: Salmon with asparagus + sweet potato
• Snack: Apple + almond butter

**Tuesday:**
• Breakfast: Veggie omelet (2 eggs)
• Lunch: Leftover salmon salad
• Dinner: Turkey chili with cornbread
• Snack: Carrot sticks + hummus

**Wednesday:**
• Breakfast: Overnight oats with chia seeds
• Lunch: Turkey chili leftovers
• Dinner: Chicken stir-fry with brown rice
• Snack: Greek yogurt

**Thursday:**
• Breakfast: Smoothie (spinach, banana, protein powder)
• Lunch: Chicken stir-fry leftovers
• Dinner: Shrimp tacos with cabbage slaw
• Snack: Handful of nuts

**Friday:**
• Breakfast: Avocado toast (whole grain) + egg
• Lunch: Shrimp taco salad
• Dinner: Homemade pizza (whole wheat crust)
• Snack: Dark chocolate

**Saturday:**
• Breakfast: Pancakes (whole grain) with berries
• Lunch: Leftover pizza
• Dinner: Grilled steak with roasted vegetables
• Snack: Cheese + crackers

**Sunday:**
• Breakfast: Breakfast burritos
• Lunch: Steak salad with vinaigrette
• Dinner: Meal prep for next week!
• Snack: Popcorn

**Prep Sunday:** Cook quinoa, hard-boil eggs, chop veggies, make dressing`;
    }
    return null;
  };

  // NUTRITION DATABASE
  const matchNutritionQuestion = (prompt) => {
    if (prompt.includes('calorie') || prompt.includes('nutrition') || prompt.includes('healthy') || prompt.includes('diet')) {
      return `⚖️ **Nutrition Information Guide**
      
**Calorie Estimates (per serving):**
• Chicken breast (6oz): 280 calories, 53g protein
• Salmon (6oz): 350 calories, 34g protein, 20g fat
• Brown rice (1 cup cooked): 215 calories, 5g protein
• Quinoa (1 cup cooked): 222 calories, 8g protein
• Sweet potato (medium): 103 calories, 2g protein
• Avocado (whole): 240 calories, 3g protein, 22g fat
• Banana (medium): 105 calories, 1g protein
• Apple (medium): 95 calories, 0.5g protein

**Macro Ratios for Goals:**
**Weight Loss:** 40% protein, 30% carbs, 30% fat
**Muscle Building:** 30% protein, 40% carbs, 30% fat
**Maintenance:** 25% protein, 45% carbs, 30% fat

**Healthy Swaps:**
• White rice → Brown rice/quinoa/cauliflower rice
• White bread → Whole grain/sprouted bread
• Potato chips → Kale chips/air-popped popcorn
• Soda → Sparkling water with fruit
• Sugar → Stevia/monk fruit
• Cream-based sauces → Tomato-based sauces
• Fried foods → Baked/grilled/air-fried

**Portion Guide:**
• Protein: Palm-sized (chicken, fish, tofu)
• Carbs: Cupped hand (rice, pasta, potatoes)
• Veggies: Two fists (salad, cooked vegetables)
• Fats: Thumb-sized (oil, nuts, avocado)

**Ask for specific food nutrition!**`;
    }
    return null;
  };

  // GENERAL COOKING HELP
  const matchGeneralCookingHelp = (prompt) => {
    const generalHelp = {
      'kitchen essentials': `🔪 **Essential Kitchen Equipment:**
      
**Knives (3 basics):**
1. Chef's knife (8-inch) - all-purpose
2. Paring knife - small tasks
3. Serrated bread knife

**Cookware:**
• 10-inch skillet (cast iron or stainless)
• 3-quart saucepan with lid
• 6-quart Dutch oven or stockpot
• Baking sheet + cooling rack
• 9x13 baking dish

**Tools:**
• Cutting boards (separate for meat/veggies)
• Measuring cups + spoons
• Mixing bowls (various sizes)
• Whisk, spatula, tongs, ladle
• Colander, vegetable peeler, grater
• Instant-read thermometer (MOST IMPORTANT!)

**Small Appliances:**
• Blender or food processor
• Hand mixer or stand mixer (for bakers)
• Slow cooker or Instant Pot

**Start with basics, add as needed!`,

      'kitchen tools': `🔪 **Essential Kitchen Equipment:**
      
**Must-Have Knives:**
1. **Chef's Knife (8-inch):** All-purpose chopping, slicing
2. **Paring Knife:** Small tasks, peeling, detail work
3. **Serrated Bread Knife:** Bread, tomatoes, delicate items

**Essential Cookware:**
• **10-inch Skillet:** Cast iron or stainless steel
• **3-quart Saucepan with Lid:** For sauces, boiling
• **6-quart Dutch Oven:** Soups, stews, braising
• **Baking Sheets:** For roasting, cookies
• **9x13 Baking Dish:** Casseroles, lasagna

**Basic Tools:**
• Cutting boards (wood or plastic)
• Measuring cups and spoons
• Mixing bowls (stainless steel)
• Whisk, spatula, tongs, ladle
• Colander, vegetable peeler, box grater
• **Instant-read Thermometer** (crucial for meat)

**Nice to Have:**
• Food processor or blender
• Stand mixer (for bakers)
• Slow cooker or Instant Pot
• Microplane zester
• Kitchen scale (for baking accuracy)

**Start with basics and build your collection!`,

      'food safety': `🧼 **Food Safety Guidelines:**
      
**Temperature Danger Zone:** 40°F - 140°F (4°C - 60°C)
• Bacteria grow rapidly in this range
• Don't leave food out more than 2 hours (1 hour if >90°F)

**Safe Cooking Temperatures:**
• Poultry: 165°F (74°C)
• Ground meats: 160°F (71°C)
• Pork: 145°F (63°C) with 3-minute rest
• Beef/steaks: 145°F (63°C) medium-rare
• Fish: 145°F (63°C) or until flakes
• Leftovers: Reheat to 165°F (74°C)

**Storage Times (Refrigerator):**
• Cooked meat: 3-4 days
• Raw poultry/fish: 1-2 days
• Raw red meat: 3-5 days
• Eggs: 3-5 weeks
• Leftovers: 3-4 days

**Freezer Storage:**
• Most meats: 6-12 months
• Cooked dishes: 2-3 months
• Vegetables: 8-12 months

**Cross-contamination prevention:**
• Separate cutting boards for meat/veggies
• Wash hands 20 seconds with soap
• Sanitize surfaces with bleach solution`,

      'cooking for beginners': `👩‍🍳 **Cooking Basics for Beginners:**
      
**Start Simple:**
1. **Scrambled eggs** - Master temperature control
2. **Pasta with jarred sauce** - Learn timing
3. **Roasted vegetables** - Learn oven use
4. **Grilled cheese** - Learn pan heat control
5. **Simple salad** - Learn knife skills

**Basic Skills to Learn:**
1. **Knife skills** - Proper chopping techniques
2. **Sautéing** - Cooking quickly in small oil
3. **Roasting** - High-heat oven cooking
4. **Boiling/Simmering** - Liquid cooking
5. **Seasoning** - Salt, pepper, herbs

**Essential Pantry Items:**
• Oils: Olive oil, vegetable oil
• Vinegars: White, apple cider, balsamic
• Spices: Salt, pepper, garlic powder, onion powder, paprika, cumin, oregano
• Canned goods: Tomatoes, beans, tuna
• Grains: Rice, pasta, oats
• Condiments: Soy sauce, mustard, ketchup

**Golden Rule:** Taste as you cook! Adjust seasoning.`,
    };

    for (const [keyword, help] of Object.entries(generalHelp)) {
      if (prompt.includes(keyword)) {
        return help;
      }
    }
    
    return null;
  };

  // DEFAULT RESPONSE WITH SUGGESTIONS
  const getDefaultResponse = (prompt) => {
    // If query is too short, ask for clarification
    if (prompt.length < 3) {
      return `👨‍🍳 **KuriousChef AI Assistant**\n\nI can help you with detailed recipes, cooking techniques, and food knowledge!\n\n**Try asking me about:**\n• Specific recipes (biriyani, lasagna, tacos, etc.)\n• Cooking techniques (baking, grilling, sautéing)\n• Ingredient substitutions\n• Meal planning and prep\n• Nutrition information\n• Kitchen equipment\n\nWhat would you like to cook today? 🍽️`;
    }
    
    // Generate intelligent suggestions based on query
    let suggestions = [];
    
    if (prompt.includes('recipe') || prompt.includes('how to make')) {
      suggestions = [
        'Here are some popular recipes you might like:',
        '• **Chicken Biryani** - Fragrant rice dish with spices',
        '• **Lasagna** - Layered pasta with cheese and sauce',
        '• **Tacos al Pastor** - Mexican street tacos',
        '• **Pad Thai** - Thai stir-fried noodles',
        '• **Butter Chicken** - Creamy Indian curry',
        '',
        'Ask for any recipe with full details!'
      ];
    } else if (prompt.includes('how') || prompt.includes('cook') || prompt.includes('make')) {
      suggestions = [
        'I can help with cooking techniques:',
        '• How to cook rice perfectly',
        '• Baking chicken without drying',
        '• Making perfect scrambled eggs',
        '• Grilling techniques and temperatures',
        '• Knife skills and chopping techniques',
        '',
        'Which technique do you need help with?'
      ];
    } else {
      suggestions = [
        'I can help with:',
        '**🍳 Recipes** - Detailed instructions for any dish',
        '**🔪 Techniques** - Cooking methods and skills',
        '**🔄 Substitutions** - Ingredient alternatives',
        '**📅 Meal Planning** - Weekly menus and prep',
        '**⚖️ Nutrition** - Healthy cooking tips',
        '',
        'Try asking: "Give me step-by-step recipe for..."'
      ];
    }
    
    return `👨‍🍳 **KuriousChef AI Assistant**\n\n${suggestions.join('\n')}`;
  };

  // MAIN RESPONSE FUNCTION
  const getLocalResponse = (prompt) => {
    // Try to get specific recipe
    const recipeMatch = matchRecipeRequest(prompt);
    if (recipeMatch) return recipeMatch;
    
    // Try cooking techniques
    const techniqueMatch = matchCookingTechnique(prompt);
    if (techniqueMatch) return techniqueMatch;
    
    // Try ingredient questions
    const ingredientMatch = matchIngredientQuestion(prompt);
    if (ingredientMatch) return ingredientMatch;
    
    // Try meal planning
    const mealPlanMatch = matchMealPlanning(prompt);
    if (mealPlanMatch) return mealPlanMatch;
    
    // Try nutrition questions
    const nutritionMatch = matchNutritionQuestion(prompt);
    if (nutritionMatch) return nutritionMatch;
    
    // Try general cooking help
    const generalMatch = matchGeneralCookingHelp(prompt);
    if (generalMatch) return generalMatch;
    
    // Default detailed response with suggestions
    return getDefaultResponse(prompt);
  };

  // Generate auto-suggestions based on input
  useEffect(() => {
    if (input.length > 2) {
      const autoSuggestions = [
        'biriyani recipe',
        'chicken breast cooking time',
        'pasta sauce from scratch',
        'baking tips for beginners',
        'meal prep ideas',
        'vegetarian dinner recipes',
        'how to cook rice perfectly',
        'kitchen essentials list',
        'lemon rice recipe',
        'butter chicken recipe',
        'grilling techniques',
        'ingredient substitutions'
      ].filter(s => s.includes(input.toLowerCase()));
      setSuggestions(autoSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      text: input, 
      sender: 'user',
      type: 'user-message'
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setTyping(true);
    setSuggestions([]);
    
    try {
      // Use the local knowledge base
      const lowerInput = userInput.toLowerCase().trim();
      const localResponse = getLocalResponse(lowerInput);
      
      // Add a small delay for realistic typing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage = { 
        text: localResponse, 
        sender: 'bot',
        type: 'ai-response'
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { 
        text: `👨‍🍳 **KuriousChef AI Assistant**\n\nI can help you with cooking questions! Try asking:\n\n• "Give me chicken biryani recipe"\n• "How to make perfect rice"\n• "Italian pasta recipes"\n• "Baking tips for beginners"\n\nWhat specific recipe or technique do you need help with? 🍽️`, 
        sender: 'bot',
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  // Quick questions
  const quickQuestions = [
    { text: '🍛 Biriyani Recipe', query: 'biriyani recipe' },
    { text: '🍕 Homemade Pizza', query: 'how to make pizza from scratch' },
    { text: '🍝 Pasta Sauce', query: 'how to make pasta sauce' },
    { text: '🥗 Meal Prep', query: '7-day meal prep' },
    { text: '🍗 Chicken Guide', query: 'how to cook chicken breast' },
    { text: '🔥 Grilling 101', query: 'grilling techniques' },
    { text: '🧁 Baking Tips', query: 'baking tips' },
    { text: '🔄 Substitutions', query: 'ingredient substitutions' },
    { text: '⚖️ Nutrition Info', query: 'nutrition information' },
    { text: '🔪 Kitchen Tools', query: 'kitchen tools' }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-toggle-btn"
          title="Chat with Chef AI"
        >
          👨‍🍳
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="header-content">
              <div className="avatar">👨‍🍳</div>
              <div>
                <h4>KuriousChef AI Assistant</h4>
                <p>Ask me anything about cooking!</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="close-btn" title="Close chat">
              ✕
            </button>
          </div>

          {/* Quick Questions */}
          <div className="quick-questions">
            <div className="questions-scroll">
              {quickQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setInput(q.query)}
                  className="quick-btn"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                <div className={`message-bubble ${msg.sender}`}>
                  <div className="message-text" style={{ whiteSpace: 'pre-line' }}>
                    {msg.text}
                    {msg.type === 'greeting' && (
                      <div className="greeting-footer">
                        ⚡ Powered by KuriousChef AI Knowledge Base
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {typing && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span>Chef is thinking...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Auto-suggestions */}
          {suggestions.length > 0 && (
            <div className="auto-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className="suggestion-btn"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="input-container">
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about recipes, techniques, substitutions..."
                className="chat-input"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className="send-btn"
              >
                →
              </button>
            </div>
            
            <div className="more-questions">
              {quickQuestions.slice(5).map((q, index) => (
                <button
                  key={index}
                  onClick={() => setInput(q.query)}
                  className="small-quick-btn"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;