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
    question: "Le meilleur ami de Sora s'appelle ...",
    answer: "riku"
  },
]

const path = require('path');
const fs = require('fs');
const USER_COMMENTS_FILE_PATH = path.join(__dirname, '../data/user-comments.json');

module.exports = class UserCommentsManager {

  static async recordComment(user, comment, antispamAnswer, isAdministrator = false) {
    await this.createUserCommentsFileIfNotExists();

    if (!checkAntispamAnswer(antispamAnswer)) return { status: "error", message: "Mauvaise réponse à la question anti-spam" };
    if (!user.name || user.name.length > 50) return { status: "error", message: "Nom invalide" };
    if (!comment || comment.length > 1100) return { status: "error", message: "Commentaire invalide" };
    if (!antispamAnswer.id || !antispamAnswer.answer) return { status: "error", message: "Réponse anti-spam invalide" };
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    const newCommentId = userComments.reduce((acc, comment) => comment.id > acc ? comment.id : acc, 0) + 1;
    const DateTimeISO = new Date().toISOString();
    const userComment = { id: newCommentId, user: user, comment: comment, date: DateTimeISO };
    if (isAdministrator) userComment.isAdministrator = true;
    userComments.push(userComment);
    fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify(userComments));
    return { status: "ok" };
  }

  static async deleteUserComment(commentId) {
    const existsFile = fs.existsSync(USER_COMMENTS_FILE_PATH);
    if (!existsFile) {
      return { status: "error", message: "Fichier de commentaires inexistants" };
    }
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    const index = userComments.findIndex(comment => Number(comment.id) === Number(commentId));
    if (index === -1) {
      return { status: "error", message: "Commentaire inexistant" };
    }
    userComments.splice(index, 1);
    fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify(userComments));
    return { status: "ok" };
  }

  static async getComments() {
    const existsFile = fs.existsSync(USER_COMMENTS_FILE_PATH);
    if (!existsFile) {
      return [];
    }
    const commentsToReturn = [];
    const userComments = JSON.parse(fs.readFileSync(USER_COMMENTS_FILE_PATH, 'utf8'));
    for (const comment of userComments) {
      const commentToReturn = {
        id: comment.id,
        userName: comment.user.name,
        comment: comment.comment,
        date: comment.date
      };
      if (comment.isAdministrator) commentToReturn.isAdministrator = true;
      commentsToReturn.push(commentToReturn);
    }
    return commentsToReturn;
  }

  static async createUserCommentsFileIfNotExists() {
    const existFile = fs.existsSync(USER_COMMENTS_FILE_PATH);
    if (!existFile) fs.writeFileSync(USER_COMMENTS_FILE_PATH, JSON.stringify([]));
  }

  static async testIfUserCommentsFileExists() {
    return
  }

  static getAntispamQuestion() {
    const randomIndex = Math.floor(Math.random() * antispamQuestions.length);
    const question = antispamQuestions[randomIndex];
    return { id: question.id, question: question.question };
  }

}

function checkAntispamAnswer(antispamAnswer) {
  const id = parseInt(antispamAnswer.id);
  const answer = antispamAnswer.answer.trim().toLowerCase();
  const question = antispamQuestions.find(question => question.id === id);
  const answerRegex = /^[a-z0-9]{1,20}$/;
  if (!answerRegex.test(answer)) {
    return false;
  }
  return question.answer.search(answer) !== -1;
}
