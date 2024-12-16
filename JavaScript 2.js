const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like your HTML, CSS, and JS

app.post('/save-answers', (req, res) => {
    const answers = req.body;

    const data = `${answers.gender}, ${answers.age}, ${answers.cookieChoice}\n`;

    fs.appendFile('survey_results.txt', data, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error saving data');
        }
        res.send({ message: 'Data saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
	
app.post('/save-answers', (req, res) => {
    const answers = req.body;

    const filePath = 'survey_results.xlsx';
    let workbook;

    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, sheet, 'Survey Results');
    }

    const worksheet = workbook.Sheets['Survey Results'];
    const row = {
        Gender: answers.gender || '',
        Age: answers.age || '',
        CookieChoice: answers.cookieChoice || '',
        Likert1: answers.q1 || '',
        Likert2: answers.q2 || '',
        Likert3: answers.q3 || '',
        Likert4: answers.q4 || '',
        Likert5: answers.q5 || '',
    };

    const rows = xlsx.utils.sheet_to_json(worksheet);
    rows.push(row);

    const newWorksheet = xlsx.utils.json_to_sheet(rows);
    workbook.Sheets['Survey Results'] = newWorksheet;

    xlsx.writeFile(workbook, filePath);
    res.send({ message: 'Data saved successfully' });
});

