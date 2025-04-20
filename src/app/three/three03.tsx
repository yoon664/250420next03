import { Box, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

/* 
    기본 카메라
*/
const Camera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    return (
        <PerspectiveCamera 
            ref={cameraRef} 
            makeDefault // 기본 카메라로 설정
            position={[0,2,5]} // 카메라 위치
            rotation={[(-Math.PI/180)*10,0,0]} // 각도
            fov = {75} // 시야각
            near = {0.1} // 가까운 클리핑 거리
            far={1000} // 먼 클리핑 거리
            // near과 far 사이에 있는 오브젝트만 화면에 표시
        />
    )
}

const Three03 = () => {
  return (
    <div className='h-screen'>
        <Canvas>
            <ambientLight intensity={10} />

            <Camera />
            <Box position={[0,0,0]} args={[1,1,1]}>
                <meshStandardMaterial color='orange' />
            </Box>
        </Canvas>
    </div>
  )
}

export default Three03