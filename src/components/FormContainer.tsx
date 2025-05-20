import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

// Form Steps
import ClientInformation from './FormSteps/ClientInformation';
import CallVolumeHours from './FormSteps/CallVolumeHours';
import CallTypes from './FormSteps/CallTypes';
import AILiveAgentHandling from './FormSteps/AILiveAgentHandling';
import KnowledgeRequirements from './FormSteps/KnowledgeRequirements';
import CallFlowEscalation from './FormSteps/CallFlowEscalation';
import LanguagesTone from './FormSteps/LanguagesTone';
import SecurityCompliance from './FormSteps/SecurityCompliance';
import CallSystems from './FormSteps/CallSystems';
import TimelineLaunch from './FormSteps/TimelineLaunch';
import AdditionalNotes from './FormSteps/AdditionalNotes';
import ProgressIndicator from './ProgressIndicator';

export default function FormContainer() {
  const { handleSubmit, formState: { isValid } } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdditionalNotes, setShowAdditionalNotes] = useState(false);
  const { getValues, trigger } = useFormContext();

  const formSteps = [
    { title: "Client Information", component: <ClientInformation /> },
    { title: "Call Volume & Hours", component: <CallVolumeHours /> },
    { title: "Call Types & Categories", component: <CallTypes /> },
    { title: "AI vs. Live Agent Handling", component: <AILiveAgentHandling /> },
    { title: "Knowledge Requirements", component: <KnowledgeRequirements /> },
    { title: "Call Flow & Escalation", component: <CallFlowEscalation /> },
    { title: "Languages & Tone", component: <LanguagesTone /> },
    { title: "Security & Compliance", component: <SecurityCompliance /> },
    { title: "Call Systems & Tech Stack", component: <CallSystems /> },
    { title: "Timeline & Launch", component: <TimelineLaunch /> },
    { title: "Additional Notes", component: <AdditionalNotes /> },
  ];

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(current => current + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleStepClick = async (step: number) => {
    // Validate all fields up to the clicked step
    const fieldsToValidate = formSteps
      .slice(0, currentStep + 1)
      .map(step => Object.keys(getValues()))
      .flat();
    
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid || step < currentStep) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // First check if the server is available
      const healthCheck = await fetch('http://localhost:5000/generate-pdf', {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => null);

      if (!healthCheck) {
        throw new Error('Backend server is not running. Please start the server and try again.');
      }

      const response = await fetch('http://localhost:5000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText}${errorData ? ` - ${errorData}` : ''}`);
      }
      
      const blob = await response.blob();
      if (!blob.size) {
        throw new Error('Generated PDF is empty');
      }

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsComplete(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      {!isComplete ? (
        <>
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={formSteps.length} 
            titles={formSteps.map(step => step.title)}
            onStepClick={handleStepClick}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                {formSteps[currentStep].component}
              </motion.div>
            </AnimatePresence>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-500 text-xs mt-1">Please ensure the backend server is running at http://localhost:5000</p>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${currentStep === 0 
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
              >
                Previous
              </button>
              
              {currentStep < formSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                    ${!isValid || isSubmitting
                      ? 'bg-[#D602C6]/50 text-white cursor-not-allowed'
                      : 'bg-[#D602C6] text-white hover:bg-[#D602C6]/90'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Generating PDF...
                    </>
                  ) : (
                    'Generate PDF'
                  )}
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
            <Download className="h-8 w-8 text-success-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            {showAdditionalNotes ? "Add Additional Notes" : "Your PDF is Ready!"}
          </h2>
          <p className="text-black mb-6">
            {showAdditionalNotes 
              ? "Add any extra information you'd like to include in your setup form."
              : "Thank you for completing the AI Voice Agent setup form."}
          </p>
          
          {showAdditionalNotes ? (
            <div className="max-w-xl mx-auto">
              <AdditionalNotes />
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setShowAdditionalNotes(false)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md text-sm font-medium hover:bg-neutral-300 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          ) : pdfUrl && (
            <div className="space-y-4">
            <a
              href={pdfUrl}
              download="ai_voice_agent_setup.pdf"
              className="inline-flex items-center px-4 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
            <button
              onClick={() => setShowAdditionalNotes(true)}
              className="block mx-auto mt-4 px-4 py-2 bg-white border border-[#D602C6] text-[#D602C6] rounded-md text-sm font-medium hover:bg-[#D602C6]/5 transition-colors"
            >
              Add More Notes
            </button>
            </div>
          )}
          
          <button
            onClick={() => {
              setIsComplete(false);
              setCurrentStep(0);
              setError(null);
              setShowAdditionalNotes(false);
              if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }
            }}
            className="mt-4 text-primary-500 hover:text-primary-600 text-sm block mx-auto"
          >
            Return to form
          </button>
        </motion.div>
      )}
    </div>
  );
}