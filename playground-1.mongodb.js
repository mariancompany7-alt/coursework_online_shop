/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
// Вибір вашої бази даних
use('smachnobox_db');

// Очищення колекцій перед завантаженням нових даних
db.boxes.drop();
db.ingredients.drop();

// 1. Генеруємо унікальні ідентифікатори для інгредієнтів
const chickenId = new ObjectId();
const broccoliId = new ObjectId();
const quinoaId = new ObjectId();
const tofuId = new ObjectId();

// 2. Завантажуємо Інгредієнти (вони вже були українською)
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
  }
]);

// 3. Завантажуємо готові Бокси (перекладені + локальні картинки)
db.boxes.insertMany([
  {
    title: 'Набір "Свіжий старт"',
    description: 'Збалансовані сніданки, обіди та вечері з нежирним білком і сезонними овочами.',
    price: 850.00,
    image_url: '/images/1.webp', // Ваш локальний файл
    tags: ['Високий вміст білка', 'Мінімум цукру', 'Свіжі продукти'],
    ingredients: [chickenId, broccoliId]
  },
  {
    title: 'Набір "Зелена енергія"',
    description: 'Рослинний раціон, створений для підвищення енергії та підтримки здорового способу життя.',
    price: 790.00,
    image_url: '/images/2.webp', // Ваш локальний файл
    tags: ['Вегетаріанський', 'Багато клітковини', 'Суперфуди'],
    ingredients: [tofuId, quinoaId, broccoliId]
  },
  {
    title: 'Набір "Детокс баланс"',
    description: 'Легкі, очищуючі страви з корисними для детоксу продуктами та поживними бульйонами.',
    price: 820.00,
    image_url: '/images/3.webp', // Ваш локальний файл
    tags: ['Підтримка детоксу', 'Без глютену', 'Низькокалорійний'],
    ingredients: [broccoliId, quinoaId]
  }
]);

console.log("✅ Україномовні бокси з локальними картинками успішно завантажено!");