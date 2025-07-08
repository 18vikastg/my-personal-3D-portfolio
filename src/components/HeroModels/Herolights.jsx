import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* Vibrant hot pink from left - main key light */}
    <spotLight
      position={[-6, 6, 6]}
      angle={0.6}
      penumbra={0.8}
      intensity={120}
      color="#ff1493"
    />

    {/* Electric cyan from right - secondary key */}
    <spotLight
      position={[6, 6, 6]}
      angle={0.6}
      penumbra={0.8}
      intensity={110}
      color="#00ffff"
    />

    {/* Neon purple from above/back - rim light */}
    <spotLight
      position={[0, 10, -6]}
      angle={0.8}
      penumbra={0.9}
      intensity={90}
      color="#9d4edd"
    />

    {/* Toxic green accent from below-left */}
    <spotLight
      position={[-4, -2, 8]}
      angle={0.7}
      penumbra={1}
      intensity={60}
      color="#39ff14"
    />

    {/* Orange gaming light from below-right */}
    <spotLight
      position={[4, -2, 8]}
      angle={0.7}
      penumbra={1}
      intensity={50}
      color="#ff6b35"
    />

    {/* Bright blue fill from front */}
    <spotLight
      position={[0, 3, 12]}
      angle={1.0}
      penumbra={1}
      intensity={70}
      color="#0066ff"
    />

    {/* Extra RGB chaos - moving light positions */}
    <pointLight
      position={[3, 4, 2]}
      intensity={40}
      color="#ff00ff"
    />

    <pointLight
      position={[-3, 4, 2]}
      intensity={40}
      color="#00ff00"
    />

    {/* Subtle warm ambient to balance the chaos */}
    <ambientLight intensity={0.25} color="#fdf2f8" />
  </>
);

export default HeroLights;