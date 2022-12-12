import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  PresentationControls,
  Box,
  Html,
  Float,
} from "@react-three/drei";

export default function BookDetails({ book, closeDetails }) {
  return (
    <div className="fixed w-1/2 h-full bottom-0 right-0">
      {book && (
        <button
          className="absolute z-20 right-16 top-36 bg-blue-500 text-white font-bold rounded py-2 px-4 shadow-lg hover:shadow-blue-500/50"
          onClick={() => closeDetails()}
        >
          Delete Book
        </button>
      )}
      {book && (
        <Canvas shadows camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 8]} />
          <PresentationControls
            global
            snap={{ mass: 4, tension: 500 }}
            rotation={[0, 0.3, 0]}
          >
            <Float>
              <Box args={[3.5, 5, 0.5]}>
                <meshStandardMaterial attach="material-0" color="white" />
                <meshStandardMaterial attach="material-1" color="blue" />
                <meshStandardMaterial attach="material-2" color="white" />
                <meshStandardMaterial attach="material-3" color="white" />
                <meshStandardMaterial attach="material-4" color="blue" />
                <meshStandardMaterial attach="material-5" color="blue" />
                <Html transform occlude position={[0, 0.25, 0.26]}>
                  <h1
                    style={{
                      fontSize: "20px",
                      color: "white",
                      lineHeight: "1em",
                      maxWidth: "5em",
                      textAlign: "center",
                    }}
                  >
                    {book.name}
                  </h1>
                </Html>
                <Html transform occlude position={[0, -0.75, 0.26]}>
                  <h2
                    style={{
                      fontSize: "14px",
                      color: "white",
                      lineHeight: "1em",
                      maxWidth: "7em",
                      textAlign: "center",
                    }}
                  >
                    by {book.author.name}
                  </h2>
                </Html>
                <Html
                  transform
                  occlude
                  position={[0.78, -2.15, -0.26]}
                  rotation={[0, Math.PI, 0]}
                >
                  <h3 style={{ fontSize: "8px", color: "white" }}>
                    Genre: {book.genre}
                  </h3>
                </Html>
              </Box>
            </Float>
          </PresentationControls>
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.5}
            scale={20}
            blur={1.5}
          />
        </Canvas>
      )}
    </div>
  );
}
