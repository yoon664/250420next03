import { Html, ScrollControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const Three06 = () => {
  return (
    <div className='w-full h-screen'>
        <Canvas>
            <ambientLight intensity={0.5} />

            <ScrollControls pages={3} damping={6}>
                <Html fullscreen>
                    <div className='w-screen h-screen bg-yellow-500 flex justify-center items-center'
                    ></div>
                </Html>
                <Text position={[0,1,0]} fontSize={1}>
                    3D
                </Text>
            </ScrollControls>
        </Canvas>
    </div>
  )
}

export default Three06