import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="absolute inset-0 bg-transparent flex flex-col z-40 p-6 items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="y2k-panel w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
          >
            <div className="y2k-titlebar">
              <span>CYBER_LUV.exe</span>
              <button className="y2k-panel-inset px-1 bg-silver text-black font-bold">X</button>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <h1 className="text-4xl font-anton uppercase text-y2k-pink leading-none tracking-tighter mb-4 y2k-chrome-text">
                Welcome<br />To<br />2000
              </h1>
              <p className="font-mono text-black text-sm mb-8">
                Warning: High levels of aesthetic detected. Proceed?
              </p>
              <button
                onClick={nextStep}
                className="w-full py-2 y2k-panel text-black font-bold uppercase tracking-wider hover:bg-white active:y2k-panel-inset transition-colors"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="y2k-panel w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
          >
            <div className="y2k-titlebar">
              <span>Identify_Yourself.dll</span>
              <button className="y2k-panel-inset px-1 bg-silver text-black font-bold">X</button>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <label className="block font-sans font-bold text-xs mb-1">Screen Name:</label>
                  <input
                    type="text"
                    placeholder="xX_angel_Xx"
                    className="w-full y2k-panel-inset p-2 font-mono text-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-xs mb-1">Password:</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full y2k-panel-inset p-2 font-mono text-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-8">
                <button className="py-1 px-4 y2k-panel text-black font-bold active:y2k-panel-inset">
                  Cancel
                </button>
                <button
                  onClick={nextStep}
                  className="py-1 px-4 y2k-panel text-black font-bold active:y2k-panel-inset"
                >
                  Connect
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="y2k-panel w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
          >
            <div className="y2k-titlebar y2k-titlebar-pink">
              <span>A/S/L Check</span>
              <button className="y2k-panel-inset px-1 bg-silver text-black font-bold">X</button>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <p className="font-sans font-bold text-sm mb-1">Name:</p>
                  <input
                    type="text"
                    className="w-full y2k-panel-inset p-2 font-mono text-black focus:outline-none"
                    placeholder="Real Name"
                  />
                </div>
                <div>
                  <p className="font-sans font-bold text-sm mb-1">Age:</p>
                  <input
                    type="number"
                    className="w-24 y2k-panel-inset p-2 font-mono text-black focus:outline-none"
                    placeholder="21"
                  />
                </div>
              </div>
              <button
                onClick={nextStep}
                className="mt-8 w-full py-2 y2k-panel text-black font-bold uppercase tracking-wider active:y2k-panel-inset"
              >
                Next &gt;
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="y2k-panel w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
          >
            <div className="y2k-titlebar">
              <span>Select_Aesthetic.exe</span>
              <button className="y2k-panel-inset px-1 bg-silver text-black font-bold">X</button>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-2">
                {['Cyber', 'Bling', 'Pop Punk', 'Frutiger Aero', 'Scene', 'Goth'].map((vibe, i) => (
                  <button
                    key={vibe}
                    className="p-2 font-sans font-bold text-xs y2k-panel active:y2k-panel-inset hover:bg-y2k-pink hover:text-white transition-colors"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
              <button
                onClick={nextStep}
                className="mt-8 w-full py-2 y2k-panel text-black font-bold uppercase tracking-wider active:y2k-panel-inset"
              >
                Finish Setup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
