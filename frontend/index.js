async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`
  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');

  function renderData(learners) {
    for (let learner of learners) {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      const h3 = document.createElement('h3');
      h3.textContent = learner.fullName;

      const emailDiv = document.createElement('div');
      emailDiv.textContent = learner.email;

      const h4 = document.createElement('h4');
      h4.textContent = "Mentors";
      h4.classList.add('closed');

      const ul = document.createElement('ul');

      for (let mentor of learner.mentors) {
        const li = document.createElement('li');
        li.textContent = mentor;
        ul.appendChild(li);
      }

      cardDiv.addEventListener('click', () => {
        info.textContent = `The selected learner is ${learner.fullName}`;
        const selectedCard = document.querySelector('.selected');
        if (selectedCard) {
          if (selectedCard === cardDiv) {
            cardDiv.classList.toggle('selected');
            h3.textContent = h3.textContent.split(',')[0]
            info.textContent = 'No learner is selected';
          } else {
            selectedCard.classList.toggle('selected');
            selectedCard.querySelector('h3').textContent = selectedCard.querySelector('h3').textContent.split(',')[0]
            cardDiv.classList.toggle('selected');
            h3.textContent = `${learner.fullName}, ID ${learner.id}`
          } 
        } else {
          cardDiv.classList.toggle('selected');
          h3.textContent = `${learner.fullName}, ID ${learner.id}`
        }
      })

      h4.addEventListener('click', (e) => {
        if (cardDiv.classList.contains('selected')) {
          e.stopPropagation();
        }
        h4.classList.toggle('closed');
        h4.classList.toggle('open');
      })

      cardDiv.appendChild(h3);
      cardDiv.appendChild(emailDiv);
      cardDiv.appendChild(h4);
      cardDiv.appendChild(ul);

      cardsContainer.appendChild(cardDiv);
    }
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆
  const learnerResponse = await axios.get('http://localhost:3003/api/learners');
  const mentorsReponse = await axios.get('http://localhost:3003/api/mentors');

  const learnersWithMentors = learnerResponse.data.map(learner => {
    const mentors = mentorsReponse.data.filter(mentor => learner.mentors.includes(mentor.id));
    const mentorNames = mentors.map(mentor => {return `${mentor.firstName} ${mentor.lastName}`});
    return {...learner, mentors: mentorNames};
  })
  info.textContent = 'No learner is selected';
  renderData(learnersWithMentors);
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()