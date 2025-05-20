import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  titles: string[];
  onStepClick: (step: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  titles,
  onStepClick
}) => {
  // Calculate progress percentage
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-800">{titles[currentStep]}</h2>
        <p className="text-sm text-neutral-500">Step {currentStep + 1} of {totalSteps}</p>
      </div>
      
      <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#D602C6]"
          initial={{ width: `${((currentStep) / totalSteps) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
      
      <div className="hidden md:flex mt-4 justify-between">
        {titles.map((title, index) => (
          <div 
            key={index}
            className={`text-xs transition-colors cursor-pointer ${
              index <= currentStep ? 'text-[#D602C6]' : 'text-neutral-400'
            } flex flex-col items-center w-8`}
            style={{ flexBasis: `${100 / totalSteps}%` }}
            onClick={() => onStepClick(index)}
          >
            <div 
              className={`w-3 h-3 rounded-full mb-1 transition-colors ${
                index < currentStep 
                  ? 'bg-[#D602C6]' 
                  : index === currentStep 
                    ? 'bg-[#D602C6] ring-2 ring-[#D602C6]/20' 
                    : 'bg-neutral-200'
              }`} 
            />
            {index === 0 || index === totalSteps - 1 || index === currentStep ? (
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title.length > 10 ? `${title.substring(0, 10)}...` : title}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;