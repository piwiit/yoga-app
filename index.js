const main = document.querySelector('main');
const basic = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];
let exerciceArray = [];

(() => {
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);
  } else {
    exerciceArray = basic;
  }
})();

class Exercice {}
const utils = {
  pageContent: function (title, content, btn) {
    document.querySelector('h1').innerHTML = title;
    main.innerHTML = content;
    document.querySelector('.btn-container').innerHTML = btn;
  },
  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener('input', (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    document.querySelectorAll('.arrow').forEach((arrow) => {
      arrow.addEventListener('click', (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            [exerciceArray[position - 1], exerciceArray[position]] = [
              exerciceArray[position],
              exerciceArray[position - 1],
            ];
            page.lobby();
            this.store();
          } else {
            position++;
          }
        });
      });
    });
  },
  deleteItem: function () {
    document.querySelectorAll('.deleteBtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = exerciceArray.indexOf(
          exerciceArray.find((exo) => exo.pic == e.target.dataset.pic)
        );
        exerciceArray.splice(index, 1);
        page.lobby();
        this.store();
      });
    });
  },

  reboot: function () {
    exerciceArray = basic;
    page.lobby();
    this.store();
  },

  store: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};
const page = {
  lobby: function () {
    let mapArray = exerciceArray
      .map(
        (exo) =>
          `<li>
              <div class='card-header'>
                <input type='number' id=${exo.pic} min='1' max='10' value=${exo.min}><span>min</span>
              </div>
              <img src="./img/${exo.pic}.png">
              <i class='fas fa-arrow-alt-circle-left arrow' data-pic=${exo.pic}></i>
              <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
              
            </li>
    `
      )
      .join('');

    utils.pageContent(
      "Parametrage<i id='reboot' class='fas fa-undo'></i>",
      `<ul>${mapArray}</ul>`,

      "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener('click', () => utils.reboot());
    start.addEventListener('click', () => this.routine());
  },
  routine: function () {
    utils.pageContent('routine', 'Exercice avec chrono', null);
  },
  finish: function () {
    utils.pageContent(
      "C'est terminé",
      "<button id='start'>Recommencer</button>",
      "<button id=reboot class='btn-reboot '>Réinitialisé <i class='fas fa-times-circle'></i></button>"
    );
  },
};

page.lobby();
