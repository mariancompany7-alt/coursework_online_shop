/* global use, db, ObjectId */
// MongoDB Playground

// Вибір вашої бази даних
use('smachnobox_db');

// Робимо користувача адміном (якщо він існує)
db.users.updateOne(
  { email: "admin@gmail.com" }, 
  { $set: { role: "admin" } }
);

// Очищення колекцій перед завантаженням нових даних
db.boxes.drop();
db.ingredients.drop();

// 1. Генеруємо унікальні ідентифікатори для інгредієнтів
const chickenId = new ObjectId();
const broccoliId = new ObjectId();
const quinoaId = new ObjectId();
const tofuId = new ObjectId();

// --- Нові інгредієнти ---
const salmonId = new ObjectId();
const sweetPotatoId = new ObjectId();
const avocadoId = new ObjectId();
const beefId = new ObjectId();
const buckwheatId = new ObjectId();

// 2. Завантажуємо розширений список інгредієнтів
db.ingredients.insertMany([
  {
    _id: chickenId,
    name: "Куряче філе гриль",
    category: "М'ясо",
    price: 65,
    weight_grams: 150,
    nutritional_value: { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    is_available: true
  },
  {
    _id: broccoliId,
    name: "Броколі на пару",
    category: "Овочі",
    price: 45,
    weight_grams: 100,
    nutritional_value: { calories: 55, protein: 3.7, fat: 0.6, carbs: 11.2 },
    is_available: true
  },
  {
    _id: quinoaId,
    name: "Кіноа",
    category: "Гарніри",
    price: 55,
    weight_grams: 100,
    nutritional_value: { calories: 120, protein: 4.4, fat: 1.9, carbs: 21.3 },
    is_available: true
  },
  {
    _id: tofuId,
    name: "Тофу з травами",
    category: "Веган",
    price: 70,
    weight_grams: 120,
    nutritional_value: { calories: 144, protein: 15, fat: 8, carbs: 3 },
    is_available: true
  },
  {
    _id: salmonId,
    name: "Філе лосося на пару",
    category: "Риба",
    price: 150,
    weight_grams: 130,
    nutritional_value: { calories: 208, protein: 22, fat: 13, carbs: 0 },
    is_available: true
  },
  {
    _id: sweetPotatoId,
    name: "Запечений батат",
    category: "Гарніри",
    price: 50,
    weight_grams: 150,
    nutritional_value: { calories: 135, protein: 2.4, fat: 0.2, carbs: 31 },
    is_available: true
  },
  {
    _id: avocadoId,
    name: "Слайси авокадо",
    category: "Овочі",
    price: 60,
    weight_grams: 50,
    nutritional_value: { calories: 80, protein: 1, fat: 7.5, carbs: 4 },
    is_available: true
  },
  {
    _id: beefId,
    name: "Томлена телятина",
    category: "М'ясо",
    price: 110,
    weight_grams: 150,
    nutritional_value: { calories: 210, protein: 28, fat: 11, carbs: 0 },
    is_available: true
  },
  {
    _id: buckwheatId,
    name: "Відварна гречка",
    category: "Гарніри",
    price: 30,
    weight_grams: 150,
    nutritional_value: { calories: 140, protein: 5, fat: 1, carbs: 27 },
    is_available: true
  }
]);

// 3. Завантажуємо 5 готових Боксів з локальними картинками
db.boxes.insertMany([
  {
    title: 'Набір "Свіжий старт"',
    description: 'Збалансовані сніданки, обіди та вечері з нежирним білком і сезонними овочами.',
    price: 850.00,
    image_url: '/images/1.webp',
    tags: ['Високий вміст білка', 'Мінімум цукру', 'Свіжі продукти'],
    ingredients: [chickenId, broccoliId, buckwheatId]
  },
  {
    title: 'Набір "Зелена енергія"',
    description: 'Рослинний раціон, створений для підвищення енергії та підтримки здорового способу життя.',
    price: 790.00,
    image_url: '/images/2.webp',
    tags: ['Вегетаріанський', 'Багато клітковини', 'Суперфуди'],
    ingredients: [tofuId, quinoaId, broccoliId, avocadoId]
  },
  {
    title: 'Набір "Детокс баланс"',
    description: 'Легкі, очищуючі страви з корисними для детоксу продуктами та поживними бульйонами.',
    price: 820.00,
    image_url: '/images/3.webp',
    tags: ['Підтримка детоксу', 'Без глютену', 'Низькокалорійний'],
    ingredients: [broccoliId, quinoaId, avocadoId]
  },
  {
    title: 'Набір "Омега-3 Заряд"',
    description: 'Преміальний набір із червоною рибою, бататом та корисними жирами для мозкової активності.',
    price: 1250.00,
    image_url: '/images/4.webp',
    tags: ['Преміум', 'Омега-3', 'Кето-френдлі'],
    ingredients: [salmonId, sweetPotatoId, broccoliId]
  },
  {
    title: 'Набір "Силове меню"',
    description: 'Раціон для спортсменів з підвищеним вмістом тваринного білка та складних вуглеводів для набору маси.',
    price: 980.00,
    image_url: '/images/5.webp',
    tags: ['Для спортсменів', 'Масонабір', 'Ситний'],
    ingredients: [beefId, chickenId, buckwheatId]
  }
]);

console.log("✅ 5 Україномовних боксів з новими інгредієнтами успішно завантажено!");