function updateViewCounter() {
  try {
    const storageKey = 'quizIgualdadeViews';
    const stored = localStorage.getItem(storageKey);
    let count = parseInt(stored || '0', 10);

    if (Number.isNaN(count)) {
      count = 0;
    }

    count += 1;
    localStorage.setItem(storageKey, String(count));

    const span = document.getElementById('viewCount');
    if (span) {
      span.textContent = count;
    }
  } catch (e) {
  }
}

window.addEventListener('DOMContentLoaded', () => {
  updateViewCounter();
});

const quizData = [
  {
    id: 1,
    pergunta: "O que é desigualdade social?",
    opcoes: [
      "Quando todos têm as mesmas oportunidades",
      "Quando algumas pessoas têm mais recursos e oportunidades que outras",
      "Quando todos têm a mesma idade",
      "Quando todos gostam das mesmas coisas"
    ],
    resposta_correta: 1,
    explicacao: "Desigualdade social acontece quando algumas pessoas têm mais acesso a coisas importantes como educação, saúde, moradia e alimentação do que outras."
  },
  {
    id: 2,
    pergunta: "Qual é o número do ODS que fala sobre redução das desigualdades?",
    opcoes: [
      "ODS 5",
      "ODS 10",
      "ODS 15",
      "ODS 1"
    ],
    resposta_correta: 1,
    explicacao: "O ODS 10 é o Objetivo de Desenvolvimento Sustentável que busca reduzir as desigualdades dentro dos países e entre eles."
  },
  {
    id: 3,
    pergunta: "O que significa tratar todas as pessoas com igualdade?",
    opcoes: [
      "Dar a mesma coisa para todo mundo",
      "Dar a cada pessoa o que ela precisa para ter as mesmas oportunidades",
      "Fazer todos pensarem igual",
      "Fazer todos vestirem as mesmas roupas"
    ],
    resposta_correta: 1,
    explicacao: "Tratar com igualdade significa garantir que cada pessoa tenha o que precisa para ter as mesmas chances de crescer feliz e saudável."
  },
  {
    id: 4,
    pergunta: "Por que todas as crianças devem ir à escola?",
    opcoes: [
      "Só para fazer amigos",
      "Porque a educação ajuda a reduzir desigualdades e dá oportunidades iguais para todos",
      "Para ficar longe de casa",
      "Só para aprender a ler"
    ],
    resposta_correta: 1,
    explicacao: "A educação é um direito de todas as crianças e ajuda a criar oportunidades iguais, permitindo que todos tenham um futuro melhor."
  },
  {
    id: 5,
    pergunta: "O que podemos fazer para ajudar a reduzir desigualdades na escola?",
    opcoes: [
      "Fazer amizade só com quem é igual a você",
      "Incluir todos nas brincadeiras e atividades, sem deixar ninguém de fora",
      "Ignorar quem é diferente",
      "Brincar sozinho"
    ],
    resposta_correta: 1,
    explicacao: "Incluir todos nas brincadeiras e respeitar as diferenças ajuda a criar um ambiente mais justo e feliz para todas as crianças."
  },
  {
    id: 6,
    pergunta: "Todas as crianças têm direito a ter comida, casa e saúde?",
    opcoes: [
      "Não, só algumas crianças",
      "Sim, todas as crianças têm esse direito",
      "Só as crianças que moram na cidade",
      "Só as crianças que têm dinheiro"
    ],
    resposta_correta: 1,
    explicacao: "Todas as crianças do mundo têm direito a alimentação, moradia, saúde e educação, independentemente de onde moram ou de sua família."
  },
  {
    id: 7,
    pergunta: "O que acontece quando uma criança não tem acesso à educação de qualidade?",
    opcoes: [
      "Ela fica mais feliz",
      "Ela pode ter menos oportunidades no futuro",
      "Nada acontece",
      "Ela aprende sozinha"
    ],
    resposta_correta: 1,
    explicacao: "Quando crianças não têm acesso à boa educação, elas podem ter menos chances de conseguir bons empregos e viver melhor no futuro."
  },
  {
    id: 8,
    pergunta: "Como podemos respeitar as diferenças entre as pessoas?",
    opcoes: [
      "Fazendo piadas sobre quem é diferente",
      "Valorizando cada pessoa como ela é, com suas características únicas",
      "Evitando falar com pessoas diferentes",
      "Tentando mudar as pessoas"
    ],
    resposta_correta: 1,
    explicacao: "Respeitar as diferenças significa aceitar e valorizar cada pessoa com suas próprias características, sejam de cor, origem, religião ou condição social."
  },
  {
    id: 9,
    pergunta: "Por que é importante que todos tenham as mesmas oportunidades?",
    opcoes: [
      "Não é importante",
      "Para que todas as pessoas possam desenvolver seus talentos e viver uma vida digna",
      "Só para alguns parecerem melhores",
      "Para que todos sejam iguais em tudo"
    ],
    resposta_correta: 1,
    explicacao: "Quando todos têm oportunidades iguais, cada pessoa pode mostrar seus talentos e contribuir para um mundo melhor e mais justo."
  },
  {
    id: 10,
    pergunta: "O que você pode fazer hoje para ajudar a reduzir desigualdades?",
    opcoes: [
      "Compartilhar brinquedos e ajudar colegas que precisam",
      "Guardar tudo só para você",
      "Fazer bullying com quem é diferente",
      "Não fazer nada"
    ],
    resposta_correta: 0,
    explicacao: "Pequenas atitudes como compartilhar, ajudar colegas, respeitar diferenças e ser gentil com todos fazem grande diferença na construção de um mundo mais igual."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let userAnswers = [];

function shuffleOptions(question) {
  const options = [...question.opcoes];
  const correctAnswer = question.resposta_correta;
  const correctText = options[correctAnswer];

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const newCorrectIndex = options.indexOf(correctText);

  return {
    shuffledOptions: options,
    correctIndex: newCorrectIndex
  };
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  userAnswers = [];
  showScreen('quizScreen');
  loadQuestion();
  playSound('start');
}

function loadQuestion() {
  answered = false;
  const question = quizData[currentQuestion];
  const { shuffledOptions, correctIndex } = shuffleOptions(question);

  // Store shuffled data for this question
  quizData[currentQuestion].shuffledOptions = shuffledOptions;
  quizData[currentQuestion].shuffledCorrectIndex = correctIndex;

  document.getElementById('questionNumber').textContent = `Pergunta ${currentQuestion + 1} de 10`;
  document.getElementById('questionText').textContent = question.pergunta;
  document.getElementById('scoreDisplay').textContent = `Acertos: ${score} 🎯`;
  document.getElementById('progressBar').style.width = `${((currentQuestion + 1) / 10) * 100}%`;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  shuffledOptions.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById('feedback').classList.remove('show');
  document.getElementById('nextBtn').classList.remove('show');
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const question = quizData[currentQuestion];
  const correctIndex = question.shuffledCorrectIndex;
  const isCorrect = selectedIndex === correctIndex;

  userAnswers.push({
    question: question.pergunta,
    userAnswer: question.shuffledOptions[selectedIndex],
    correctAnswer: question.shuffledOptions[correctIndex],
    isCorrect: isCorrect,
    explanation: question.explicacao
  });

  if (isCorrect) {
    score++;
    document.getElementById('scoreDisplay').textContent = `Acertos: ${score} 🎯`;
  }

  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.classList.add('correct');
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  const feedback = document.getElementById('feedback');
  const feedbackText = document.getElementById('feedbackText');
  const explanation = document.getElementById('explanation');

  feedback.classList.remove('correct', 'incorrect');

  if (isCorrect) {
    feedback.classList.add('correct');
    feedbackText.textContent = '🎉 Parabéns! Resposta correta!';
    playSound('correct');
  } else {
    feedback.classList.add('incorrect');
    feedbackText.textContent = `😢 Ops! A resposta correta é: ${question.shuffledOptions[correctIndex]}`;
    playSound('incorrect');
  }

  explanation.textContent = question.explicacao;
  feedback.classList.add('show');

  document.getElementById('nextBtn').classList.add('show');
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showScreen('resultsScreen');

  const finalScore = document.getElementById('finalScore');
  const resultMessage = document.getElementById('resultMessage');
  const resultIcon = document.getElementById('resultIcon');

  finalScore.textContent = `${score} de 10 perguntas corretas!`;

  if (score === 10) {
    resultMessage.textContent = 'INCRÍVEL! Você é um expert em igualdade! 🌟🏆';
    resultIcon.textContent = '🏆';
    createConfetti();
  } else if (score >= 7) {
    resultMessage.textContent = 'MUITO BEM! Você sabe bastante! 👏✨';
    resultIcon.textContent = '⭐';
    createConfetti();
  } else if (score >= 4) {
    resultMessage.textContent = 'BOM TRABALHO! Continue aprendendo! 💪📚';
    resultIcon.textContent = '📚';
  } else {
    resultMessage.textContent = 'Não desista! Tente novamente! 🌈💙';
    resultIcon.textContent = '💙';
  }

  playSound('finish');
}

function showReview() {
  showScreen('reviewScreen');

  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';

  userAnswers.forEach((answer, index) => {
    const item = document.createElement('div');
    item.className = `review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;

    item.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 10px;">${answer.isCorrect ? '✅' : '❌'} Pergunta ${index + 1}</div>
      <div class="review-question">${answer.question}</div>
      <div class="review-answer" style="color: ${answer.isCorrect ? '#22543d' : '#742a2a'}">
        <strong>Sua resposta:</strong> ${answer.userAnswer}
      </div>
      ${!answer.isCorrect ? `<div class="review-answer" style="color: #22543d"><strong>Resposta correta:</strong> ${answer.correctAnswer}</div>` : ''}
      <div class="review-explanation">💡 ${answer.explanation}</div>
    `;

    reviewList.appendChild(item);
  });
}

function backToResults() {
  showScreen('resultsScreen');
}

function restartQuiz() {
  showScreen('homeScreen');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Play sound (simple beep using Web Audio API)
function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'incorrect') {
      oscillator.frequency.value = 200;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'start' || type === 'finish') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  } catch (e) {
  }
}

function createConfetti() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = 'confetti-fall 3s linear';

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 30);
  }
}
