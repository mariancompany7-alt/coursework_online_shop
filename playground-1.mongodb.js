/* global use, db, ObjectId */
// MongoDB Playground

// Вибір вашої бази даних
use('smachnobox_db');

// Робимо користувача адміном (якщо він існує)
db.users.updateOne(
  { email: "admin@gmail.com" }, 
  { $set: { role: "admin" } }
);

// Очищення колекцій перед завантаженням нових даних (повне видалення старих карток)
db.boxes.drop();
db.ingredients.drop();

// 1. Генеруємо унікальні ідентифікатори для інгредієнтів
const chickenId = new ObjectId();
const broccoliId = new ObjectId();
const quinoaId = new ObjectId();
const tofuId = new ObjectId();
const salmonId = new ObjectId();
const sweetPotatoId = new ObjectId();
const avocadoId = new ObjectId();
const beefId = new ObjectId();
const buckwheatId = new ObjectId();
const shrimpId = new ObjectId();

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
  },
  {
    _id: shrimpId,
    name: "Тигрові креветки гриль",
    category: "Морепродукти",
    price: 180,
    weight_grams: 100,
    nutritional_value: { calories: 99, protein: 24, fat: 0.3, carbs: 0.2 },
    is_available: true
  }
]);

// 3. Завантажуємо 6 готових Боксів із скороченими тегами
db.boxes.insertMany([
  {
    title: 'Набір "Свіжий старт"',
    description: 'Оптимізований базовий раціон із розрахованим балансом макронутрієнтів. Забезпечує стабільний рівень глюкози завдяки складним вуглеводам.',
    price: 550.00,
    image_url: '/images/1.webp',
    tags: ['Збалансований'],
    ingredients: [chickenId, broccoliId, buckwheatId]
  },
  {
    title: 'Набір "Вегетаріанський"',
    description: 'Рослинний протокол харчування з повноцінним амінокислотним профілем. Джерело рослинного протеїну та клітковини для підтримки мікробіому.',
    price: 605.00,
    image_url: '/images/2.webp',
    tags: ['Вегетаріанський', 'Без м`яса'],
    ingredients: [tofuId, quinoaId, broccoliId, avocadoId]
  },
  {
    title: 'Набір "Баланс"',
    description: 'Універсальний дієтичний комплекс із точним співвідношенням білків, жирів та вуглеводів. Спрямований на підтримку метаболічного гомеостазу.',
    price: 570.00,
    image_url: '/images/3.webp',
    tags: ['Дієтичний', 'Збалансований'],
    ingredients: [chickenId, quinoaId, broccoliId, avocadoId]
  },
  {
    title: 'Набір "Омега-3 заряд"',
    description: 'Спеціалізований набір із високою концентрацією поліненасичених жирних кислот (EPA та DHA). Підтримує когнітивні функції та серцево-судинну систему.',
    price: 995.00,
    image_url: '/images/4.webp',
    tags: ['Омега жири', 'Кето'],
    ingredients: [salmonId, sweetPotatoId, broccoliId, avocadoId]
  },
  {
    title: 'Набір "М\'ясний"',
    description: 'Високобілковий раціон, розроблений для стимуляції м\'язової гіпертрофії та відновлення після інтенсивних фізичних навантажень.',
    price: 675.00,
    image_url: '/images/5.webp',
    tags: ['Для спортсменів', 'Високий білок'],
    ingredients: [beefId, chickenId, buckwheatId, sweetPotatoId]
  },
  {
    title: 'Набір "Морський"',
    description: 'Пескетаріанський комплекс, збагачений йодом, цинком та легкозасвоюваним протеїном високої біологічної цінності.',
    price: 1050.00,
    image_url: '/images/6.png',
    tags: ['Амінокислоти', 'Морепродукти'],
    ingredients: [shrimpId, salmonId, avocadoId, quinoaId]
  }
]);

console.log("✅ 6 Україномовних боксів успішно завантажено. Теги скорочено!");