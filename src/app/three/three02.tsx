import { Plane, Text, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Light = () => {
    const lightRef = useRef<THREE.DirectionalLight>(null);
    useHelper(
        lightRef as React.MutableRefObject<THREE.DirectionalLight>,
        THREE.DirectionalLightHelper,
        1,
        0xff00ff
    )
    
    return (
        <directionalLight
            position={[0,1,0]}
            intensity={10}
            castShadow
        />
    )
}

const Three02 = () => {
  return (
    <div className='h-screen'>
        <Canvas>

            {/* <ambientLight intensity={15} /> 걍 빛 */}

            {/* 전구 */}
            {/* <pointLight 
                color={'#0000ff'} // 색상
                position={[0,1,0]} // 위치
                intensity={100} // 강도
                distance={10} // 거리
                decay={1} // 감쇠
                castShadow  // 그림자효과
                receiveShadow // 그림자효과
            /> */}
            
            {/* 연예인 조명.. */}
            {/* <spotLight
                position={[0,1,0]} // 위치
                angle={(Math.PI/180) * 90} // 각도
                intensity={10} // 강도
                penumbra={0.5} // 흐림효과
                castShadow
            /> */}

            {/* 태양광 */}
            {/* <directionalLight
                position={[0,1,0]} // 위치
                intensity={10} // 강도
                castShadow
            /> */}

            <Light />

            <Text>HELLO</Text>

            {/* Plane : 평면 객체 (바닥이나 벽) */}
            <Plane 
                args={[5,5]} 
                rotation={[-Math.PI/2,0,0]}
                position={[0,-0.5,0]}
                >
                    <meshStandardMaterial color='green' />

            </Plane>
        </Canvas>
    </div>
  )
}

export default Three02