const fs = require('fs');
const path = require('path');

const newsDir = './news';
const outputFile = './news/news.json';

// Διάβασε όλα τα JSON αρχεία
const newsFiles = fs.readdirSync(newsDir)
    .filter(file => file.endsWith('.json') && file !== 'news.json');

const allNews = [];

newsFiles.forEach(file => {
    const filePath = path.join(newsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
        const newsItem = JSON.parse(content);
        allNews.push(newsItem);
    } catch (e) {
        console.log(`Skipping ${file}: ${e.message}`);
    }
});

// Ταξινόμηση με την πιο πρόσφατη πρώτη
allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

// Αποθήκευση
fs.writeFileSync(outputFile, JSON.stringify(allNews, null, 2));
console.log(`✅ Created news.json with ${allNews.length} items`);