import { useEffect, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Object3D, Vector3, Euler, Group } from "three";

const Bird = () => {
  const birdScene = "./bird.glb";
  const birdRef = useRef<Group | undefined>(undefined);

  const { scene, animations } = useGLTF(birdScene);

  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    if (actions && actions["Take 001"]) actions["Take 001"].play();
  }, [actions]);

  useFrame(({ clock, camera }) => {
    if (birdRef.current) {
      const birdPosition = birdRef.current.position as Vector3;
      const birdRotation = birdRef.current.rotation as Euler;

      birdPosition.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
      if (birdPosition.x > camera.position.x + 10) {
        birdRotation.y = Math.PI;
      } else if (birdPosition.x < camera.position.x - 10) {
        birdRotation.y = 0;
      }

      if (birdRotation.y === 0) {
        birdPosition.x += 0.01;
        birdPosition.z -= 0.01;
      } else {
        birdPosition.x -= 0.01;
        birdPosition.z += 0.01;
      }
    }
  });
  const birdPosition = [-5, 2, 1];
  const birdScale = [0.003, 0.003, 0.003];
  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={birdRef} position={birdPosition} scale={birdScale}>
        <primitive object={scene} />
      </mesh>
    </>
  );
};
export default memo(Bird);
