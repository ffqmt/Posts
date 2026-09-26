// Monta cabeçalho, numeração e rodapé de cada slide automaticamente.
(function () {
  const marca = document.body.dataset.marca || 'Franco Tecnologia';
  const arroba = document.body.dataset.arroba || '@franco_tecnologia';
  const slides = document.querySelectorAll('.slide');
  const total = String(slides.length).padStart(2, '0');

  slides.forEach((slide, i) => {
    const n = String(i + 1).padStart(2, '0');
    const ultimo = i === slides.length - 1;

    const topo = document.createElement('div');
    topo.className = 'topo';
    topo.innerHTML = `<span>${marca}</span><span>${n}/${total}</span>`;

    const rodape = document.createElement('div');
    rodape.className = 'rodape';
    rodape.innerHTML =
      `<span class="arroba">@<span>${arroba.replace(/^@/, '')}</span></span>` +
      (ultimo ? '' : '<span class="arraste">arraste →</span>');

    slide.prepend(topo);
    slide.append(rodape);
  });

  if (new URLSearchParams(location.search).has('exportar')) {
    document.body.classList.add('exportando');
  }
})();
