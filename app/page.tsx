"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loading from "./loading";
import Island from "./models/Island";
import "./globals.css";

export default function Home() {
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;
    if (window && window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition,islandRotation=[0.1, 4.7077, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition,islandRotation];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition,islandRotation] = adjustIslandForScreenSize();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="w-full h-screen relative p-2">
        <Canvas className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`} camera={{ near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <directionalLight position={[10, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
            <hemisphereLight groundColor="#000000" intensity={1} />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={islandRotation}
              scale={islandScale}
            />
          </Suspense>
        </Canvas>
      </section>
    </main>
  );
}
