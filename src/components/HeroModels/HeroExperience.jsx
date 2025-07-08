import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Room } from './Room.jsx'
import Herolights from './Herolights.jsx'

function HeroExperience() {
  const isTable = useMediaQuery({query: '(max-width: 1024px)'});
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});
  return (
    <Canvas camera={{position: [0, 0, 15], fov: 45}}>
     
      <OrbitControls 
        enablePan={false}
        enableZoom={!isTable}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

    <Herolights />

      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, -4.5, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
       
      </group>
        <Room position={[0, -3.5, 0]} /> 
    </Canvas>
  )
}

export default HeroExperience