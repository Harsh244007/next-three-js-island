import { a } from "@react-spring/three";
import React, { memo, useEffect, useRef, KeyboardEvent } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

type IslandSceneType = string | string[] | any;

type IslandProps = {
  isRotating: boolean;
  position: number[];
  rotation: number[];
  scale: number[];
  setIsRotating: (value: boolean) => void;
  setCurrentStage: (value: number | null) => void;
};
function Island({ isRotating, setIsRotating, setCurrentStage, ...props }: IslandProps) {
  const IslandScene = "./island.glb";
  const islandRef = useRef<any>();
  const { gl, viewport } = useThree();
  // @ts-ignore
  const { nodes, materials } = useGLTF<IslandSceneType>(IslandScene);

  const lastX = useRef<number>(0);
  const rotationSpeed = useRef<number>(0);
  const dampingFactor: number = 0.95;

  const handlePointerDown = (event: PointerEvent | TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = ("touches" in event ? event.touches[0].clientX : event.clientX) || 0;

    lastX.current = clientX;
  };

  const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: PointerEvent | TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = ("touches" in event ? event.touches[0].clientX : event.clientX) || 0;
      const delta = (clientX - lastX.current) / viewport.width;
      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;

        lastX.current = clientX;

        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      if (islandRef.current) islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      if (islandRef.current) islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    // window.addEventListener("keydown", handleKeyDown as EventListener);
    // window.addEventListener("keyup", handleKeyUp as unknown as EventListener);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      // window.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
      // window.removeEventListener("keyup", handleKeyUp as unknown as EventListener);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      if (islandRef.current) islandRef.current.rotation.y += rotationSpeed.current;
    } else if (islandRef.current) {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <>
    {/* @ts-ignore */}
    <a.group ref={islandRef}  {...props}>
      <mesh geometry={nodes.polySurface944_tree_body_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.polySurface945_tree1_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.polySurface946_tree2_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.polySurface947_tree1_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.polySurface948_tree_body_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.polySurface949_tree_body_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.pCube11_rocks1_0.geometry} material={materials.PaletteMaterial001} />
    </a.group>
    </>
  );
}
export default memo(Island)