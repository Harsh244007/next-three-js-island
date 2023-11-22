import { useEffect, memo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

type PlansPropsType = {
  isRotating: boolean;
  position: number[];
  rotation: number[];
  scale: number[];
};
function Plane({ isRotating, ...props }: PlansPropsType) {
  const planeScene = "./plane.glb";
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions && actions["Take 001"]) {
      if (isRotating) {
        actions["Take 001"].play();
      } else {
        actions["Take 001"].stop();
      }
    }
  }, [actions, isRotating]);

  return (
    <>
      {/* @ts-ignore */}
      <mesh {...props} ref={ref}>
        <primitive object={scene} />
      </mesh>
    </>
  );
}
export default memo(Plane);
