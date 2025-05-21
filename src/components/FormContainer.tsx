import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        body: JSON.stringify({
          ...data,
          sendEmail: true
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText}${errorData ? ` - ${errorData}` : ''}`);
      }
      
      setIsComplete(true);
      setIsSubmitted(true);
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
                  onClick={() => {
                    if (currentStep === formSteps.length - 2) {
                      setShowAdditionalNotes(true);
                      setIsComplete(true);
                    } else {
                      nextStep();
                    }
                  }}
                  className="px-4 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="px-4 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Sending PDF...
                    </>
                  ) : (
                    'Send Information'
                  )}
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success-500" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Your information has been submitted, Thank You!</h2>
            <p className="text-black mb-6">
              We'll review your requirements and get back to you shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#D602C6]">
              <Mail className="h-4 w-4" />
              <span className="text-sm">A email with your information has been sent to a VoiceMedia agent! </span>
            </div>
            <button
              onClick={() => {
                setIsComplete(false);
                setIsSubmitted(false);
                setCurrentStep(0);
                setError(null);
                setShowAdditionalNotes(false);
              }}
              className="mt-8 px-6 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors flex items-center mx-auto"
            >
              Create New Form
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-success-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Add Additional Notes</h2>
          <p className="text-black mb-6">
            Add any extra information you'd like to include in your setup form.
          </p>
          
          <div className="max-w-xl mx-auto">
            <AdditionalNotes />
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => {
                  setIsComplete(false);
                  setCurrentStep(formSteps.length - 2);
                }}
                className="px-4 py-2 bg-neutral-200 text-black rounded-md text-sm font-medium hover:bg-neutral-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                disabled={!isValid || isSubmitting}
                className="px-4 py-2 bg-[#D602C6] text-white rounded-md text-sm font-medium hover:bg-[#D602C6]/90 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending PDF...
                  </>
                ) : (
                  'Send Information'
                )}
              </button>
            </div>
          </div>
          
          <button
            onClick={() => {
              setIsComplete(false);
              setCurrentStep(formSteps.length - 2);
              setError(null);
              setShowAdditionalNotes(false);
            }}
            className="mt-4 text-primary-500 hover:text-primary-600 text-sm block mx-auto"
          >
            
          </button>
        </motion.div>
        )
      )}
    </div>
  );
}