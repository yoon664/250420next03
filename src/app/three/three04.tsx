import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

const Model = () => {
    const { scene, animations } = useGLTF('/Pikachu.glb');
    console.log(scene); // 모델에 대한 정보
    console.log(animations); // 애니메이션에 대한 정보

    const ref = useRef<THREE.Object3D>(null);
    // GLTF 모델에 포함된 애니메이션을 제어가능
    const { actions } = useAnimations(animations, ref);
    console.log(actions);

    const [currentAnimation, setCurrentAnimation] = useState('WalkStanding');

    useEffect(()=>{
        actions[currentAnimation]?.fadeIn(0.5).play(); // 자연스러운 움직임을 위해 fadeIn
        setTimeout(() => {
            setCurrentAnimation('Run');
        },5000);
        return () => {
            actions[currentAnimation]?.fadeIn(0.5).stop();
        }
    }, [actions,currentAnimation])

    useFrame(()=>{
        if(ref.current){
            ref.current.rotation.y += 0.1;
        }
    })
    

    return (
        <primitive
            ref={ref}
            object={scene}
            position={[0,0,0]}
            scale={1}        
        />
    );
}

const Three04 = () => {
  return (
    <div className='h-screen'>
        <Suspense fallback={<span>로딩중..</span>}>
            <Canvas>
                <ambientLight intensity={5} />
                <Model />
            </Canvas>
        </Suspense>
    </div>
  )
}

export default Three04