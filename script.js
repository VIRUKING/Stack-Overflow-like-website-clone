

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    const apiUrl = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${encodeURIComponent(query)}&site=stackoverflow`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filterCriteria = document.getElementById('filter').value;
            const sortedQuestions = sortQuestions(data.items, filterCriteria);
            displayResults(sortedQuestions);
        })
        .catch(error => console.error('Error fetching data:', error));
});

// questions sort karva
function sortQuestions(questions, criteria) {

    //  higher number shows first
    questions.sort((a, b) => b.creation_date - a.creation_date);

  
    if (criteria !== 'creation_date') {
        questions.sort((a, b) => {
            switch (criteria) {
                case 'score':
                    return b.score - a.score;
                case 'view_count':
                    return b.view_count - a.view_count; 
                default:
                    return 0;
            }
        });
    }

    return questions;
}

//search results  batava
function displayResults(questions) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (questions.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    questions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p><strong>Question:</strong> ${question.title}</p>
            <p><strong>Asked by:</strong> ${question.owner.display_name}</p>
            <p><strong>Tags:</strong> ${question.tags.join(', ')}</p>
            <h3><a href="${question.link}" target="_blank">${question.title}</a><br></h3>
            <p>Score: ${question.score} | Answers: ${question.answer_count} | Number of Comments: ${question.view_count} | Created on: ${new Date(question.creation_date * 1000).toLocaleDateString()}</p>
        <br>`;
        resultsDiv.appendChild(questionElement);
    });
}

// Event listeners for login and registration buttons
document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('registerButton').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'block';
});

// Event listeners to close the login and registration forms
document.getElementById('closeLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('closeRegister').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'none';
});
