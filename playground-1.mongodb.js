/* global use, db, ObjectId */

use('smachnobox_db');

db.users.updateOne(
  { email: "admin@gmail.com" }, 
  { $set: { role: "admin" } }
);

db.boxes.drop();
db.ingredients.drop();

const chickenId = new ObjectId();
const turkeyId = new ObjectId();
const beefId = new ObjectId();
const salmonId = new ObjectId();
const shrimpId = new ObjectId();
const tofuId = new ObjectId();
const buckwheatId = new ObjectId();
const bulgurId = new ObjectId();
const pumpkinId = new ObjectId();
const greenBeansId = new ObjectId();
const beetrootId = new ObjectId();
const avocadoId = new ObjectId();
const complexSaladId = new ObjectId();

db.ingredients.insertMany([
  {
    _id: chickenId,
    name: "Куряче філе гриль (добова норма)",
    category: "М'ясо",
    price: 130,
    weight_grams: 350,
    nutritional_value: { calories: 560, protein: 110, fat: 12, carbs: 0 },
    is_available: true
  },
  {
    _id: turkeyId,
    name: "Філе індички су-від (добова норма)",
    category: "М'ясо",
    price: 180,
    weight_grams: 350,
    nutritional_value: { calories: 490, protein: 105, fat: 7, carbs: 0 },
    is_available: true
  },
  {
    _id: beefId,
    name: "Томлена телятина (добова норма)",
    category: "М'ясо",
    price: 250,
    weight_grams: 300,
    nutritional_value: { calories: 630, protein: 75, fat: 33, carbs: 0 },
    is_available: true
  },
  {
    _id: salmonId,
    name: "Філе лосося на пару (добова норма)",
    category: "Риба",
    price: 320,
    weight_grams: 250,
    nutritional_value: { calories: 520, protein: 50, fat: 35, carbs: 0 },
    is_available: true
  },
  {
    _id: shrimpId,
    name: "Тигрові креветки (добова норма)",
    category: "Морепродукти",
    price: 380,
    weight_grams: 250,
    nutritional_value: { calories: 250, protein: 60, fat: 2, carbs: 1 },
    is_available: true
  },
  {
    _id: tofuId,
    name: "Органічний тофу (добова норма)",
    category: "Веган",
    price: 140,
    weight_grams: 350,
    nutritional_value: { calories: 520, protein: 55, fat: 30, carbs: 10 },
    is_available: true
  },
  {
    _id: buckwheatId,
    name: "Гречана крупа (добова порція гарніру)",
    category: "Гарніри",
    price: 45,
    weight_grams: 400,
    nutritional_value: { calories: 440, protein: 16, fat: 3, carbs: 85 },
    is_available: true
  },
  {
    _id: bulgurId,
    name: "Булгур з овочами (добова порція гарніру)",
    category: "Гарніри",
    price: 70,
    weight_grams: 400,
    nutritional_value: { calories: 480, protein: 14, fat: 5, carbs: 95 },
    is_available: true
  },
  {
    _id: pumpkinId,
    name: "Пюре із запеченого гарбуза",
    category: "Гарніри",
    price: 60,
    weight_grams: 350,
    nutritional_value: { calories: 245, protein: 5, fat: 1, carbs: 55 },
    is_available: true
  },
  {
    _id: greenBeansId,
    name: "Стручкова квасоля та броколі",
    category: "Овочі",
    price: 90,
    weight_grams: 300,
    nutritional_value: { calories: 120, protein: 8, fat: 1, carbs: 20 },
    is_available: true
  },
  {
    _id: beetrootId,
    name: "Буряк з волоським горіхом та олією",
    category: "Овочі",
    price: 85,
    weight_grams: 250,
    nutritional_value: { calories: 380, protein: 8, fat: 25, carbs: 30 },
    is_available: true
  },
  {
    _id: avocadoId,
    name: "Свіже авокадо (на кілька прийомів)",
    category: "Овочі",
    price: 120,
    weight_grams: 150,
    nutritional_value: { calories: 240, protein: 3, fat: 22, carbs: 12 },
    is_available: true
  },
  {
    _id: complexSaladId,
    name: "Мікс салатів з оливковою олією та насінням",
    category: "Овочі",
    price: 110,
    weight_grams: 300,
    nutritional_value: { calories: 350, protein: 6, fat: 32, carbs: 10 },
    is_available: true
  }
]);

db.boxes.insertMany([
  {
    title: 'Набір "Свіжий старт"',
    description: 'Оптимізований базовий раціон із розрахованим балансом макронутрієнтів. Забезпечує стабільний рівень глюкози завдяки складним вуглеводам.',
    price: 550.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780925575/start_q4rnwa.jpg',
    tags: ['Збалансований'],
    ingredients: [chickenId, buckwheatId, greenBeansId, complexSaladId] 
  },
  {
    title: 'Набір "Вегетаріанський"',
    description: 'Рослинний протокол харчування з повноцінним амінокислотним профілем. Джерело рослинного протеїну та клітковини для підтримки мікробіому.',
    price: 605.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780925655/vegeterian_ixnmcv.jpg',
    tags: ['Вегетаріанський', 'Без м`яса'],
    ingredients: [tofuId, bulgurId, beetrootId, complexSaladId] 
  },
  {
    title: 'Набір "Баланс"',
    description: 'Універсальний дієтичний комплекс із точним співвідношенням білків, жирів та вуглеводів. Спрямований на підтримку метаболічного гомеостазу.',
    price: 570.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780924627/balance_vrgyx6.jpg',
    tags: ['Дієтичний', 'Збалансований'],
    ingredients: [turkeyId, bulgurId, pumpkinId, complexSaladId] 
  },
  {
    title: 'Набір "Омега-3 заряд"',
    description: 'Спеціалізований набір із високою концентрацією поліненасичених жирних кислот. Підтримує когнітивні функції та серцево-судинну систему.',
    price: 995.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780927567/omega_3_rjrbrg.jpg',
    tags: ['Омега жири', 'Кето'],
    ingredients: [salmonId, avocadoId, beetrootId, greenBeansId] 
  },
  {
    title: 'Набір "М\'ясний"',
    description: 'Високобілковий раціон, розроблений для стимуляції м\'язової гіпертрофії та відновлення після інтенсивних фізичних навантажень.',
    price: 750.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780927801/meat3_bok0ux.jpg',
    tags: ['Для спортсменів', 'Високий білок'],
    ingredients: [beefId, chickenId, buckwheatId, greenBeansId] 
  },
  {
    title: 'Набір "Морський"',
    description: 'Пескетаріанський комплекс, збагачений йодом, цинком та легкозасвоюваним протеїном високої біологічної цінності.',
    price: 1050.00,
    image_url: 'https://res.cloudinary.com/coursework-smachnobox/image/upload/q_auto/f_auto/v1780928094/seafood_sfpebf.png',
    tags: ['Амінокислоти', 'Морепродукти'],
    ingredients: [shrimpId, salmonId, pumpkinId, complexSaladId] 
  }
]);

console.log("Додано 6 боксів");