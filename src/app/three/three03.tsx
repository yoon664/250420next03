import { Box, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

/* 
    기본 카메라
*/
const Camera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    /* 
        [ useFrame ]
        매 프레임마다 호출
    */
    useFrame(()=>{
        if(cameraRef.current) {
            cameraRef.current.rotation.y += 0.1;
        }
    })
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

/*
    [ 투노드 카메라 ]
    카메라 자체가 회전하며 항상 특정 지점을 바라봄
    카메라가 움직이더라도 무조건 항상 지정된 지점을 바라봄
*/
const TwoNodeCamera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    /* 
        [ THREE.Vector3 ]
        three.js에서 제공하느 3차원 벡터 클래스
        x,y,z 좌표를 가진 3차원 공간의 점이나 방향을 나타냄
        만약, three.js 라이브러리의 메서드나 속성에서 사용될 때 좌표값을 이렇게 전달
    */
    const targetPosition = new THREE.Vector3(0, 2, 0);

    useFrame(()=>{
        if(cameraRef.current) {
            cameraRef.current.lookAt(targetPosition);
            cameraRef.current.rotation.y += 0.1;
        }
    })

    return (
        <PerspectiveCamera 
            ref={cameraRef} 
            makeDefault
            position={[0,2,5]}
            rotation={[(-Math.PI/180)*10,0,0]}
            fov = {75}
            near = {0.1}
            far={1000}
        />
    )
}

const Three03 = () => {
  return (
    <div className='h-screen'>
        <Canvas>
            <ambientLight intensity={10} />

            {/* <Camera /> */}
            <TwoNodeCamera />
            <Box position={[0,0,0]} args={[1,1,1]}>
                <meshStandardMaterial color='orange' />
            </Box>
        </Canvas>
    </div>
  )
}

export default Three03