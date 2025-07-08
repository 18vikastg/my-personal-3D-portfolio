import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* Strong Red from left */}
    <spotLight
      position={[-5, 5, 5]}
      angle={0.5}
      penumbra={1}
      intensity={80}
      color="#ff005b"
    />
    {/* Strong Green from right */}
    <spotLight
      position={[5, 5, 5]}
      angle={0.5}
      penumbra={1}
      intensity={80}
      color="#00ffae"
    />
    {/* Strong Blue from above/back */}
    <spotLight
      position={[0, 8, -5]}
      angle={0.7}
      penumbra={1}
      intensity={70}
      color="#0099ff"
    />
    {/* Soft purple/pink fill from front */}
    <spotLight
      position={[0, 2, 10]}
      angle={0.8}
      penumbra={1}
      intensity={40}
      color="#a259ff"
    />
    {/* Optional: subtle white fill */}
    <ambientLight intensity={0.15} color="#ffffff" />
  </>
);

export default HeroLights;