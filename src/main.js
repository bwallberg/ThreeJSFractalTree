import FractalTree from "./FractalTree";
import Engine from "./Engine"

const engine = new Engine();
const tree = new FractalTree(
  {
    x: 0, y: -75, z:0
  },
  {
    width: 1,
    height: 20,
    depth: 1
  }
);

tree.getBranches().forEach((branch, index) => {
  engine.addCube(branch.getPosition(), branch.getSize(), branch.getAngle());
});

function update() {
  tree.grow().forEach((branch, index) => {
      engine.addCube(branch.getPosition(), branch.getSize(), branch.getAngle());
  });
}

let last = 0;   
function onFrame(now) {
  const dt = now - last;
  requestAnimationFrame(onFrame);
  engine.render();
  if (dt > 75) {
    update();
    last = now;
  }
}

function setupControls() {
  let cameraActive = false;
  let x = 0;
  let y = 0;
  document.addEventListener("mousedown", (evt) => {
    cameraActive = true;
    x = evt.x;
    y = evt.y;
  });

  document.addEventListener("mouseup", (evt) => {
    cameraActive = false;
  });

  document.addEventListener("mousemove", (evt) => {
    if (cameraActive) {
      let xz = (evt.x - x)/1000;
      let yz = (evt.y - y)/1000; 
      
      engine.camera.rotation.x -= yz;
      engine.camera.rotation.y -= xz;

      x = evt.x;
      y = evt.y;
    }
  });

  document.addEventListener("keydown", (evt) => {
    evt.preventDefault();
    switch(evt.code) {
      case "ArrowRight":
        engine.camera.position.x += 1;
        break;
      case "ArrowLeft":
        engine.camera.position.x -= 1;
        break;
      case "ArrowUp":
        engine.camera.position.z -= 1;
        break;
      case "ArrowDown":
        engine.camera.position.z += 1;
        break;
    }
  });
}

setupControls();
onFrame();