/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/Pikachu.glb -o src/app/three/pikachu.tsx 
*/

import * as THREE from 'three'
import React, { useEffect, useMemo } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = 'AttackTackle' | 'Faint' | 'Happy' | 'Hurt' | 'Idle' | 'idle2' | 'Run' | 'ThunderBolt' | 'thurnderBoltChargeContinue' | 'WalkStanding'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    pikachu_1: THREE.SkinnedMesh
    pikachu_2: THREE.SkinnedMesh
    pikachu_3: THREE.SkinnedMesh
    PG_root: THREE.Bone
  }
  materials: {
    mouth: THREE.MeshStandardMaterial
    eye: THREE.MeshStandardMaterial
    body: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/Pikachu.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(()=>{
    actions['Happy']?.fadeIn(0.5).play();
    return () => {
      actions['Happy']?.fadeOut(0.5).stop();
    }
  }, [actions]);

  useFrame(()=>{
    if(group.current) {
      group.current.rotation.y += 0.1;
    }
  })

  const greenMaterial = useMemo(
    ()=> 
      new THREE.MeshStandardMaterial({
        color : '#00ff00',
        metalness : 0.7,
        roughness : 0.2
      }),
    []
  )
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Pikachu" rotation={[Math.PI / 2, 0, 0]} scale={4.232}>
          <primitive object={nodes.PG_root} />
          <group name="pikachu">
            <skinnedMesh name="pikachu_1" geometry={nodes.pikachu_1.geometry} material={materials.mouth} skeleton={nodes.pikachu_1.skeleton} />
            <skinnedMesh name="pikachu_2" geometry={nodes.pikachu_2.geometry} material={materials.eye} skeleton={nodes.pikachu_2.skeleton} />
            <skinnedMesh name="pikachu_3" geometry={nodes.pikachu_3.geometry}
            // material={materials.body}
            material={greenMaterial}
            skeleton={nodes.pikachu_3.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Pikachu.glb')