import { Box, Cone, Cylinder, Environment, MeshTransmissionMaterial, OrbitControls, Sky, Sphere, Torus } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { tree } from 'next/dist/build/templates/app-page'
import React from 'react'

const Three01 = () => {
  return (
    <div className='h-screen bg-yellow-400'>
        {/* Fiber의 핵심 컴포넌트, 3D씬을 렌더링하는 공간을 제공 */}
        <Canvas>
            {/* 주변광 추가 */}
            <ambientLight intensity={10} />

            {/* mesh : 3D객체의 기본 단위 */}
            <mesh position={[-2,0,0]}>  {/* x축 y축 z축 */}
                <sphereGeometry args={[1,32,32]} />
                <meshStandardMaterial color='red' />
            </mesh>

            {/* 
                [ Drei의 Primitive 컴포넌트 ]
                - mesh 래퍼가 필요없음
                - geometry와 material을 자동으로 생성
                (custom material을 자식으로 추가 가능)
                - position, scale, rotation 속성을 직접 받을 수 있음
            */}
            <Sphere position={[-4,0,0]} args={[1,32,32]}>
                <meshStandardMaterial color='red' />
            </Sphere>

            <Cone position={[2,0,0]} args={[1,2,32]}>
                <meshStandardMaterial color='green' />
            </Cone>

            <Box position={[0,0,0]} args={[1,1,1]}>
                <meshStandardMaterial color='orange' />
            </Box>

            <Cylinder position={[0,0,-2]} args={[1,1,2,32]}>
                <meshStandardMaterial color='royalblue' />
            </Cylinder>

            <Torus position={[2,0,-4]} args={[1,0.4,16,100]}>
                {/* 더 복잡한 물리기반 렌더링 지원 */}
                {/* <meshStandardMaterial
                color='silver'
                metalness={0.9}
                roughness={0.1}
                /> */}

                {/* 투명도 지원 */}
                <MeshTransmissionMaterial
                    transparent={true} // 투명도 활성화
                    opacity={0.8}
                />
            </Torus>

            {/* 카메라 조작 컴포넌트 */}
            <OrbitControls />

            {/* 실시간 하늘과 태양의 위치 반영하는 배경 */}
            <Sky sunPosition={[100,20,100]} />

            {/* 주변 환경 설정 sky와는 별개 */}
            <Environment preset='sunset' />

        </Canvas>
    </div>
  )
}

export default Three01