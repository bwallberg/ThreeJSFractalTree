const DEGREES_TO_RADIANS = Math.PI/180;

class Engine {
  constructor() {
    this.rendering = false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.camera.position.z = 150;
    this.camera.position.y = 5;
    window.camera = this.camera;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addCube(position, size, angle) {
    const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    const material = new THREE.MeshBasicMaterial({ color: 1000 + Math.random() * 10000000 });
    const cube = new THREE.Mesh(geometry, material);

    cube.rotation.z = Math.cos(angle * DEGREES_TO_RADIANS);

    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    this.scene.add(cube);
    if (!window.cube) {
      window.cube = cube;
    }
  }
}

export default Engine;