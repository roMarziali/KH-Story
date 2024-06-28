const antispamQuestions = [
  {
    id: 1,
    question: "Ecrivez le nom de l'arme utilisée par Sora",
    answer: "keyblade"
  },
  {
    id: 2,
    question: "Quel est le nom du personnage principal de la série Kingdom Hearts ?",
    answer: "sora"
  },
  {
    id: 3,
    question: "Sora est accompagné par Donald et ...",
    answer: "dingo"
  },
  {
    id: 4,
    question: "Sora est originaire de l'Île du ...",
    answer: "destin"
  },
  {
    id: 5,
    question: "Kingdom Hearts a été créé par Tetsuya ...",
    answer: "nomura"
  },
  {
    id: 6,
    question: "Le meilleur ami de Sora s'appelle ...",
    answer: "riku"
  },
]

const path = require('path');
const fs = require('fs');
const USER_COMMENTS_FILE_PATH = path.join(__dirname, '../data/user-comments.json');

module.exports = class UserCommentsManager {



  recordComment(user, comment, antispamAnswer, isAdministrator = false) {
    if (!this.testIfUserCommentsFileExists()) {
      this.createUserCommentsFile();
    }
    if (!checkAntispamAnswer(antispamAnswer)) {
      return { status: "error", message: "Mauvaise réponse à la question anti-spam" };
    }
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    const newCommentId = userComments.reduce((acc, comment) => comment.id > acc ? comment.id : acc, 0) + 1;
    const userComment = { id: newCommentId, user: user, comment: comment };
    if (isAdministrator) userComment.isAdministrator = true;
    userComments.push(userComment);
    fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify(userComments));
  }

  deleteUserComment(commentId) {
    if (!this.testIfUserCommentsFileExists()) {
      return { status: "error", message: "Fichier de commentaires inexistants" };
    }
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    const index = userComments.findIndex(comment => comment.id === commentId);
    if (index === -1) {
      return { status: "error", message: "Commentaire inexistant" };
    }
    userComments.splice(index, 1);
    fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify(userComments));
  }

  getComments() {
    if (!this.testIfUserCommentsFileExists()) {
      return [];
    }
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    return userComments;
  }

  createUserCommentsFile() {
    fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify([]));
  }

  testIfUserCommentsFileExists() {
    return fs.existsSync(USER_COMMENTS_FILE_PATH);
  }

  getAntispamQuestion() {
    const randomIndex = Math.floor(Math.random() * antispamQuestions.length);
    const question = antispamQuestions[randomIndex];
    return { id: question.id, question: question.question };
  }

}

function checkAntispamAnswer(antispamAnswer) {
  const id = parseInt(antispamAnswer.id);
  const answer = antispamAnswer.answer;
  const question = antispamQuestions.find(question => question.id === id);
  answer = answer.trim().toLowerCase();
  const answerRegex = /^[a-z0-9]{1,20}$/;
  if (!answerRegex.test(answer)) {
    return false;
  }
  return question.answer.search(answer) !== -1;
}
