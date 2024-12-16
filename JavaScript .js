let genderAnswer = null;
let ageAnswer = null;

function startSurvey() {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('questionnaire').classList.remove('hidden');
}

function closeSurvey() {
    window.location.href = "https://www.example.com"; // Close or redirect
}

function answerGender(gender) {
    genderAnswer = gender;
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');
}

function answerAge(age) {
    ageAnswer = age;
    document.getElementById('question2').classList.add('hidden');
    document.getElementById('continue').classList.remove('hidden');
}

function showPage() {
    document.getElementById('questionnaire').classList.add('hidden');
    document.getElementById('company-pages').classList.remove('hidden');

    const randomPage = Math.floor(Math.random() * 4);
    const pages = ['trendol', 'anatolia', 'ghazi', 'restaurant'];
    document.getElementById(pages[randomPage]).style.display = 'block';

    // Show cookie consent
    document.getElementById('cookie-consent').classList.remove('hidden');
}

function acceptCookies() {
    saveAnswers('Accept');
    closeSurvey();
}

function rejectCookies() {
    saveAnswers('Reject');
    closeSurvey();
}

function manageCookies() {
    // Handle cookie management logic
    alert("Managing cookies...");
}

function saveAnswers(cookieChoice) {
    const answers = {
        gender: genderAnswer,
        age: ageAnswer,
        cookieChoice: cookieChoice
}
		
function acceptCookies() {
    handleCookies('Accept');
}

function rejectCookies() {
    handleCookies('Reject');
}

function manageCookies() {
    handleCookies('Manage');
}

function handleCookies(choice) {
    saveAnswers({ cookieChoice: choice });
    document.getElementById('cookie-consent').classList.add('hidden');
    document.getElementById('likert-scale').classList.remove('hidden');
}

function submitLikert() {
    const likertForm = document.getElementById('likert-form');
    const formData = new FormData(likertForm);
    const likertResponses = {};

    for (let [key, value] of formData.entries()) {
        likertResponses[key] = value;
    }

    if (Object.keys(likertResponses).length < 5) {
        alert("Please answer all the Likert scale questions.");
        return;
    }

    saveAnswers(likertResponses);

    // Proceed to the next phase (e.g., the final 20 questions)
    document.getElementById('likert-scale').classList.add('hidden');
    alert("Thank you for completing this part of the survey. The next section will now load.");
    // Load next section logic
}
		
    };

    // Send answers to backend
    fetch('/save-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers)
    }).then(response => response.json())
      .then(data => console.log('Data saved:', data));
}
