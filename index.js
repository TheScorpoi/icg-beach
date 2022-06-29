import Helper from './helper';

const canvas = document.getElementById('canvas');

const helper = new Helper(canvas);

bindEventListeners();
render();

function bindEventListeners() {
  window.onresize = resizeCanvas;
  document.addEventListener('touchmove', (e) => {
    helper.onDocumentMouseMove(e.touches[0]);
  });
  document.addEventListener('mousemove', (e) => {
    helper.onDocumentMouseMove(e);
  });
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = '100%';
  canvas.style.height= '100%';

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  helper.onWindowResize();
}

function render() {
  requestAnimationFrame(render);
  helper.update();
}
