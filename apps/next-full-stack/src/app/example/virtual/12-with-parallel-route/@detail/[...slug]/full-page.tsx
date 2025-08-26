'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DetailFullPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // 테마(상태 바) 색상 변경
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', '#e2e8f0');

    return () => {
      meta.setAttribute('content', '#ffffff');
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col bg-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <motion.div
        className="flex flex-1 flex-col gap-2 overflow-auto p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <Button onClick={handleGoBack} className="w-full">
          Go Back
        </Button>
      </motion.div>
    </motion.div>
  );
}
