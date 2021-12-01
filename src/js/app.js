import '../scss/app.scss';
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../images/svg/', true, /\.svg$/));
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
document.addEventListener('click', (e) => {
  const searchEl = document.querySelector('.search__input');
  const searchbtn = document.querySelector('.search__label');
  if (
    searchEl.classList.contains('active') &&
    !e.target.closest('[data-event="open-search"]')
  ) {
    [searchEl, searchbtn].forEach((elem) => {
      elem.classList.remove('active');
    });
  } else if (e.target.closest('[data-event="open-search"]')) {
    [searchEl, searchbtn].forEach((elem) => {
      elem.classList.add('active');
    });
  }
});
