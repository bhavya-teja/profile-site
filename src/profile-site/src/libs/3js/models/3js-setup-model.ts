import { AnimationMixer } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

function setupModel(data: GLTF) {
  const model = data.scene.children[0];
  if (data.animations.length >= 1) {
    const clip = data.animations[0];
    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
    //model.tick = (delta) => mixer.update(delta);
    model.updateMatrix();
  }

  return model;
}

export { setupModel };