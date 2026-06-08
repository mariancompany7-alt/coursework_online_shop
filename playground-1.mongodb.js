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
const turkeyId = new ObjectId(); // Новий: Індичка су-від
const beefId = new ObjectId();
const salmonId = new ObjectId();
const shrimpId = new ObjectId();
const tofuId = new ObjectId();

const buckwheatId = new ObjectId();
const bulgurId = new ObjectId(); // Новий: Булгур
const pumpkinId = new ObjectId(); // Новий: Пюре з гарбуза

const greenBeansId = new ObjectId(); // Новий: Стручкова квасоля
const beetrootId = new ObjectId(); // Новий: Буряк з горіхами
const avocadoId = new ObjectId(); // Залишаємо тільки для Омега-3

// 2. Завантажуємо оновлений список ексклюзивних та локальних інгредієнтів
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
    _id: turkeyId,
    name: "Філе індички",
    category: "М'ясо",
    price: 90,
    weight_grams: 150,
    nutritional_value: { calories: 155, protein: 34, fat: 1.5, carbs: 0 },
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
    _id: salmonId,
    name: "Філе лосося на пару",
    category: "Риба",
    price: 150,
    weight_grams: 130,
    nutritional_value: { calories: 208, protein: 22, fat: 13, carbs: 0 },
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
  },
  {
    _id: tofuId,
    name: "Тофу з пряними травами",
    category: "Веган",
    price: 70,
    weight_grams: 120,
    nutritional_value: { calories: 144, protein: 15, fat: 8, carbs: 3 },
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
    _id: bulgurId,
    name: "Булгур з овочами",
    category: "Гарніри",
    price: 45,
    weight_grams: 150,
    nutritional_value: { calories: 125, protein: 4, fat: 0.5, carbs: 28 },
    is_available: true
  },
  {
    _id: pumpkinId,
    name: "Пюре із запеченого гарбуза",
    category: "Гарніри",
    price: 40,
    weight_grams: 150,
    nutritional_value: { calories: 65, protein: 1.5, fat: 0.2, carbs: 15 },
    is_available: true
  },
  {
    _id: greenBeansId,
    name: "Стручкова квасоля з часником",
    category: "Овочі",
    price: 55,
    weight_grams: 100,
    nutritional_value: { calories: 35, protein: 2, fat: 0.2, carbs: 7 },
    is_available: true
  },
  {
    _id: beetrootId,
    name: "Карпачо з буряка з волоським горіхом",
    category: "Овочі",
    price: 60,
    weight_grams: 100,
    nutritional_value: { calories: 110, protein: 3, fat: 7, carbs: 10 },
    is_available: true
  },
  {
    _id: avocadoId,
    name: "Слайси стиглого авокадо",
    category: "Овочі",
    price: 60,
    weight_grams: 50,
    nutritional_value: { calories: 80, protein: 1, fat: 7.5, carbs: 4 },
    is_available: true
  }
]);

// 3. Завантажуємо 6 готових Боксів із новими комбінаціями
db.boxes.insertMany([
  {
    title: 'Набір "Свіжий старт"',
    description: 'Оптимізований базовий раціон із розрахованим балансом макронутрієнтів. Забезпечує стабільний рівень глюкози завдяки складним вуглеводам.',
    price: 550.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780925575/start_q4rnwa.jpg',
    tags: ['Збалансований'],
    ingredients: [chickenId, buckwheatId, greenBeansId] // Курка, гречка, стручкова квасоля
  },
  {
    title: 'Набір "Вегетаріанський"',
    description: 'Рослинний протокол харчування з повноцінним амінокислотним профілем. Джерело рослинного протеїну та клітковини для підтримки мікробіому.',
    price: 605.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780925655/vegeterian_ixnmcv.jpg',
    tags: ['Вегетаріанський', 'Без м`яса'],
    ingredients: [tofuId, bulgurId, beetrootId] // Тофу, булгур, буряк з горіхами
  },
  {
    title: 'Набір "Баланс"',
    description: 'Універсальний дієтичний комплекс із точним співвідношенням білків, жирів та вуглеводів. Спрямований на підтримку метаболічного гомеостазу.',
    price: 570.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780924627/balance_vrgyx6.jpg',
    tags: ['Дієтичний', 'Збалансований'],
    ingredients: [turkeyId, pumpkinId, greenBeansId] // Індичка су-від, гарбузове пюре, стручкова квасоля
  },
  {
    title: 'Набір "Омега-3 заряд"',
    description: 'Спеціалізований набір із високою концентрацією поліненасичених жирних кислот. Підтримує когнітивні функції та серцево-судинну систему.',
    price: 995.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780927567/omega_3_rjrbrg.jpg',
    tags: ['Омега жири', 'Кето'],
    ingredients: [salmonId, beetrootId, avocadoId] // Лосось, карпачо з буряка, авокадо
  },
  {
    title: 'Набір "М\'ясний"',
    description: 'Високобілковий раціон, розроблений для стимуляції м\'язової гіпертрофії та відновлення після інтенсивних фізичних навантажень.',
    price: 675.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780927801/meat3_bok0ux.jpg',
    tags: ['Для спортсменів', 'Високий білок'],
    ingredients: [beefId, chickenId, buckwheatId] // Телятина, курка, гречка
  },
  {
    title: 'Набір "Морський"',
    description: 'Пескетаріанський комплекс, збагачений йодом, цинком та легкозасвоюваним протеїном високої біологічної цінності.',
    price: 1050.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780928094/seafood_sfpebf.png',
    tags: ['Амінокислоти', 'Морепродукти'],
    ingredients: [shrimpId, bulgurId, pumpkinId] // Креветки, булгур, пюре з гарбуза
  }
]);

console.log("✅ 6 Україномовних боксів з локальними та ексклюзивними інгредієнтами успішно завантажено!");