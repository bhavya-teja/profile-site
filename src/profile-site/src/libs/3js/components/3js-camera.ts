import { PerspectiveCamera } from 'three';

function createCamera(cameraPosition: number[], fov: number | undefined, aspectRatio: number | undefined) {
  const camera = new PerspectiveCamera(fov, aspectRatio, 0.1, 100);
  camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
  camera.lookAt(0, 0, 0);
  return camera;
}

export { createCamera };