const Box = require('../models/Box');

// Отримуємо всі бокси з бази даних
exports.getAllBoxes = async (req, res) => {
    try {
        const boxes = await Box.find(); // Шукає всі записи в колекції boxes
        res.status(200).json(boxes);
    } catch (error) {
        console.error('Помилка отримання боксів:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

// Тимчасова функція для додавання боксу (знадобиться нам для заповнення БД)
exports.createBox = async (req, res) => {
    try {
        const newBox = new Box(req.body);
        const savedBox = await newBox.save();
        res.status(201).json(savedBox);
    } catch (error) {
        res.status(400).json({ message: 'Помилка валідації', error: error.message });
    }
};

// Оновлення існуючого боксу
exports.updateBox = async (req, res) => {
    try {
        const { id } = req.params;
        // Знаходимо бокс за ID і оновлюємо його новими даними з req.body
        const updatedBox = await Box.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedBox) {
            return res.status(404).json({ message: 'Бокс не знайдено' });
        }
        res.status(200).json(updatedBox);
    } catch (error) {
        console.error('Помилка оновлення боксу:', error);
        res.status(500).json({ message: 'Помилка оновлення боксу', error: error.message });
    }
};

// Видалення боксу
exports.deleteBox = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBox = await Box.findByIdAndDelete(id);
        
        if (!deletedBox) {
            return res.status(404).json({ message: 'Бокс не знайдено' });
        }
        res.status(200).json({ message: 'Бокс успішно видалено' });
    } catch (error) {
        console.error('Помилка видалення боксу:', error);
        res.status(500).json({ message: 'Помилка видалення боксу', error: error.message });
    }
};