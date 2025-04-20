import { Box, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
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
/*
    [ Pivot ]
    pivot은 객체가 회전하는 기준점 역할 (중심점은 기본적으로 0,0,0)
    카메라가 고정된 채로 pivot(group)이 회전
*/
const PivotCamera = ()=>{
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const pivotRef = useRef<THREE.Group>(null);

    useFrame(()=>{
        if(pivotRef.current) {
            pivotRef.current.rotation.y += 0.1;
        }
    })

    return (
        <group ref={pivotRef} position={[0,2,0]}>
            <PerspectiveCamera 
                ref={cameraRef} 
                makeDefault
                position={[0,0,5]}
                fov = {75}
                near = {0.1}
                far={1000}
            />
        </group>
        
    )
}

/*
    [ useThree ]
    - 카메라에 접금하는 두번째 방법]
    - Perspective Camera를 만들지 않고 현재 활성화된 카메라를 참조
    - 주로 카메라 조작에 사용
*/
const ThreeCamera = ()=>{
    const { camera,set } = useThree();

    useEffect(()=>{
        camera.position.set(0,2,5);
        camera.position.x = (-Math.PI/180*10);
        camera.updateProjectionMatrix();

        set({camera})
    }, [camera,set])

    useFrame(()=>{
        camera.rotation.y += 0.1;
    })

    return null;
}

const SmoothCamera = ()=>{
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3(2,2,2));

    useFrame(()=>{
        /*
            [ lerp ]
            목표위치로 부드럽게 이동하는 메서드
            lerp(목표위치, 이동속도)
        */
        camera.position.lerp(targetPosition.current, 0.05);

        camera.lookAt(0,0,0);
    })

    return null;
}

const Three03 = () => {
  return (
    <div className='h-screen'>
        <Canvas>
            <ambientLight intensity={10} />

            {/* <Camera /> */}
            {/* <TwoNodeCamera /> */}
            {/* <PivotCamera /> */}
            {/* <ThreeCamera /> */}
            <SmoothCamera />

            <Box position={[0,0,0]} args={[1,1,1]}>
                <meshStandardMaterial color='orange' />
            </Box>
        </Canvas>
    </div>
  )
}

export default Three03