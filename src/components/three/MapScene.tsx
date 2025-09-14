
'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
  useGLTF,
} from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'
import { Group } from 'three'

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

function AdventurerModel() {
  const { scene } = useGLTF('/models/low_poly_adventurer.glb')
  const questProgress = useAppStore((state) => state.questProgress)
  const ref = useRef<Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = -1.5 + questProgress * 3 // Move adventurer based on progress
    }
  })

  return <primitive object={scene} scale={0.01} position={[-1.5, 0, 0]} ref={ref} />
}

function TreasureChestModel() {
  const { scene } = useGLTF('/models/low_poly_treasure_chest.glb')
  return <primitive object={scene} scale={0.01} position={[1.5, 0, 0]} />
}

function MapModel() {
  const { scene } = useGLTF('/models/low_poly_map.glb')
  return <primitive object={scene} scale={0.01} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
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

          {/* 3D Models */}
          <MapModel />
          <AdventurerModel />
          <TreasureChestModel />

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


