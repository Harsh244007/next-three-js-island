import { useRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

type SkyPropsType = {
  isRotating: boolean;
};
export function Sky({ isRotating }: SkyPropsType) {
  const skyScene = "./sky.glb";
  const sky = useGLTF(skyScene);
  const skyRef = useRef<Group | undefined>(undefined);

  useFrame((_, delta) => {
    if (isRotating && skyRef.current && skyRef.current.rotation) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={skyRef}>
        <primitive object={sky.scene} />
      </mesh>
    </>
  );
}
export default memo(Sky);
