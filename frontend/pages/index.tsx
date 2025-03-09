import type { InferGetStaticPropsType, NextPage } from 'next';
import { authorizedSanityExperimentalTypesafeClient } from '../src/sanity/sanityClient';
import { SceneName } from '../src/SceneController';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BackgroundScribbles from '../src/components/BackgroundScribbles';
import CursorEffects from '../src/components/CustomCursor';
import CityscapeCanvas from '../src/components/CityscapeCanvas'; // Custom futuristic background

export async function getStaticProps() {
  const projects = await authorizedSanityExperimentalTypesafeClient.getAll('project');
  const scene: SceneName = 'intro';
  return {
    props: {
      projects,
      scene,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ScenePage: NextPage<Props> = ({ projects }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Background Cityscape Animation */}
      <CityscapeCanvas />

      {/* Cursor Effects */}
      <CursorEffects />

      {/* Floating Neon Background Scribbles */}
      <BackgroundScribbles />

      {/* Cyberpunk Hero Section */}
      <div className="absolute top-1/4 text-center z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-cyan-400 tracking-wider neon-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Sujal Charak
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Exploring AI, Blockchain & Web3 Development 🚀
        </motion.p>

        {/* Call to Action Buttons */}
        <div className="flex space-x-6 justify-center mt-6">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="/projects">
              <a className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all shadow-lg neon-border">
                View My Work
              </a>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="/about">
              <a className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all shadow-lg neon-border">
                About Me
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScenePage;
