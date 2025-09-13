'use client'

import { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Html,
  useProgress
} from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-2"></div>
        <div className="text-sm">Loading {progress.toFixed(0)}%</div>
      </div>
    </Html>
  )
}

function SimpleScene() {
  const questProgress = useAppStore((state) => state.questProgress)
  
  return (
    <group>
      {/* Simple placeholder geometry */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Treasure chest placeholder */}
      <mesh position={[1, 0.5, 1]}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={0.2 + questProgress * 0.3}
        />
      </mesh>
      
      {/* Adventurer placeholder */}
      <mesh position={[-1 + questProgress * 2, 0.5, 0]}>
        <capsuleGeometry args={[0.2, 0.8]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
    </group>
  )
}

function CameraController() {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    // Gentle camera movement based on mouse position
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 0.5 - camera.position.y + 2) * 0.02
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface MapSceneProps {
  className?: string
}

export function MapScene({ className }: MapSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 5, 8], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD700" />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Simple 3D Scene */}
          <SimpleScene />
          
          {/* Camera Controls */}
          <CameraController />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

