

import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export function Room({ 
  castShadow = true, 
  receiveShadow = true, 
  envMapIntensity = 0.8,
  ...props 
}) {
  const { nodes, materials } = useGLTF('/models/optimized-room.glb')
  
  // Enhance materials with better lighting properties
  const enhancedMaterials = useMemo(() => {
    const enhanced = {}
    
    // Enhance blinn1 material
    if (materials.blinn1) {
      enhanced.blinn1 = materials.blinn1.clone()
      enhanced.blinn1.envMapIntensity = envMapIntensity
      enhanced.blinn1.roughness = 0.4
      enhanced.blinn1.metalness = 0.1
    }
    
    // Enhance lambert1 material (emissive objects)
    if (materials.lambert1) {
      enhanced.lambert1 = materials.lambert1.clone()
      enhanced.lambert1.emissive = materials.lambert1.color || '#ffffff'
      enhanced.lambert1.emissiveIntensity = 0.5
    }
    
    // Enhance phong1 material (windows)
    if (materials.phong1) {
      enhanced.phong1 = materials.phong1.clone()
      enhanced.phong1.transparent = true
      enhanced.phong1.opacity = 0.9
      enhanced.phong1.envMapIntensity = envMapIntensity * 1.2
    }
    
    return enhanced
  }, [materials, envMapIntensity])

  // Group meshes by logical components for better organization
  const furnitureMeshes = useMemo(() => [
    { geo: nodes.table_blinn1_0?.geometry, name: 'table' },
    { geo: nodes.chair_body_blinn1_0?.geometry, name: 'chair' },
    { geo: nodes.pillows_blinn1_0?.geometry, name: 'pillows' },
    { geo: nodes.cabin_blinn1_0?.geometry, name: 'cabin' },
  ], [nodes])

  const techMeshes = useMemo(() => [
    { geo: nodes.comp_blinn1_0?.geometry, name: 'computer' },
    { geo: nodes.monitor2_blinn1_0?.geometry, name: 'monitor2' },
    { geo: nodes.monitor3_blinn1_0?.geometry, name: 'monitor3' },
    { geo: nodes.keyboard_blinn1_0?.geometry, name: 'keyboard' },
    { geo: nodes.miuse_blinn1_0?.geometry, name: 'mouse' },
    { geo: nodes.tablet_blinn1_0?.geometry, name: 'tablet' },
    { geo: nodes.stylus_blinn1_0?.geometry, name: 'stylus' },
  ], [nodes])

  const lightingMeshes = useMemo(() => [
    { geo: nodes.lamp_bl_blinn1_0?.geometry, name: 'lamp_base' },
    { geo: nodes.lamp_white_blinn1_0?.geometry, name: 'lamp_shade' },
    { geo: nodes.emis_lambert1_0?.geometry, name: 'emissive', material: 'lambert1' },
  ], [nodes])

  const structuralMeshes = useMemo(() => [
    { geo: nodes.window_blinn1_0?.geometry, name: 'window_frame' },
    { geo: nodes.window4_phong1_0?.geometry, name: 'window_glass', material: 'phong1' },
    { geo: nodes.radiator_blinn1_0?.geometry, name: 'radiator1' },
    { geo: nodes.radiator_blinn1_0001?.geometry, name: 'radiator2' },
    { geo: nodes.railing_blinn1_0?.geometry, name: 'railing' },
  ], [nodes])

  const accessoryMeshes = useMemo(() => [
    { geo: nodes._________6_blinn1_0?.geometry, name: 'unknown_object' },
    { geo: nodes.body1_blinn1_0?.geometry, name: 'body1' },
    { geo: nodes.handls_blinn1_0?.geometry, name: 'handles' },
    { geo: nodes.kovrik_blinn1_0?.geometry, name: 'mat' },
    { geo: nodes.pCylinder5_blinn1_0?.geometry, name: 'cylinder' },
    { geo: nodes.polySurface53_blinn1_0?.geometry, name: 'surface' },
    { geo: nodes.red_bttns_blinn1_0?.geometry, name: 'red_buttons' },
    { geo: nodes.red_vac_blinn1_0?.geometry, name: 'red_vacuum' },
    { geo: nodes.triangle_blinn1_0?.geometry, name: 'triangle' },
    { geo: nodes.vac_black_blinn1_0?.geometry, name: 'black_vacuum' },
    { geo: nodes.vacuum1_blinn1_0?.geometry, name: 'vacuum1' },
    { geo: nodes.vacuumgrey_blinn1_0?.geometry, name: 'grey_vacuum' },
    { geo: nodes.vires_blinn1_0?.geometry, name: 'wires' },
  ], [nodes])

  const renderMeshGroup = (meshes, groupName) => (
    <group name={groupName} key={groupName}>
      {meshes.map(({ geo, name, material = 'blinn1' }, index) => 
        geo ? (
          <mesh
            key={`${name}-${index}`}
            geometry={geo}
            material={enhancedMaterials[material] || materials[material]}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            name={name}
          />
        ) : null
      )}
    </group>
  )

  return (
    <group {...props} dispose={null} name="room">
      {renderMeshGroup(furnitureMeshes, 'furniture')}
      {renderMeshGroup(techMeshes, 'technology')}
      {renderMeshGroup(lightingMeshes, 'lighting')}
      {renderMeshGroup(structuralMeshes, 'structure')}
      {renderMeshGroup(accessoryMeshes, 'accessories')}
    </group>
  )
}

// Enhanced preload with error handling
Room.preload = () => {
  try {
    useGLTF.preload('/models/optimized-room.glb')
  } catch (error) {
    console.warn('Failed to preload room model:', error)
  }
}

export default Room