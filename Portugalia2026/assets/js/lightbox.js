
document.addEventListener('DOMContentLoaded', function () {
  var groups = {};
  document.querySelectorAll('a.thumb').forEach(function (a) {
    var g = a.getAttribute('data-group') || 'default';
    if (!groups[g]) groups[g] = [];
    groups[g].push(a);
  });

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Zamknij">&times;</button>' +
    '<button class="lb-prev" aria-label="Poprzednie">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Następne">&#8250;</button>' +
    '<div class="lb-counter"></div>';
  document.body.appendChild(lb);

  var imgEl = lb.querySelector('img');
  var counterEl = lb.querySelector('.lb-counter');
  var currentGroup = [];
  var currentIndex = 0;

  function show(index) {
    if (!currentGroup.length) return;
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    var link = currentGroup[currentIndex];
    imgEl.src = link.getAttribute('href');
    imgEl.alt = link.getAttribute('data-alt') || '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentGroup.length;
  }

  function open(group, index) {
    currentGroup = groups[group] || [];
    show(index);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  document.querySelectorAll('a.thumb').forEach(function (a, _) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var g = a.getAttribute('data-group') || 'default';
      var idx = groups[g].indexOf(a);
      open(g, idx);
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(currentIndex - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(currentIndex + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
});
