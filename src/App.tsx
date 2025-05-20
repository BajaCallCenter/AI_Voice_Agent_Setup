import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContainer from './components/FormContainer';
import Header from './components/Header';
import { motion } from 'framer-motion';

function App() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Client Information
      businessName: '',
      website: '',
      date: '',
      contactName: '',
      email: '',
      phone: '',
      
      // Call Volume & Hours
      callVolume: '',
      supportCoverage: '',
      otherSupportCoverage: '',
      seasonalVolume: '',
      
      // Call Types & Categories
      callTypes: [] as string[],
      otherCallType: '',
      callMix: '',
      
      // AI vs. Live Agent Handling
      aiLiveAgentMix: '',
      otherAiLiveAgentMix: '',
      liveAgentCalls: [] as string[],
      otherLiveAgentCalls: '',
      
      // Knowledge Requirements
      systemAccess: '',
      knowledgeBase: '',
      websiteFAQ: '',
      
      // Call Flow & Escalation
      escalationAction: '',
      otherEscalationAction: '',
      specificTeams: '',
      
      // Languages & Tone
      languages: '',
      otherLanguages: '',
      agentTone: '',
      otherTone: '',
      aiVoicePreference: '',
      
      // Security & Compliance
      compliance: [] as string[],
      
      // Call Systems & Tech Stack
      phoneSystem: '',
      otherPhoneSystem: '',
      crm: [] as string[],
      otherCRM: '',
      
      // Timeline & Launch
      launchTimeline: '',
      currentProvider: '',
      switchReason: '',
      otherSwitchReason: '',
      
      // Additional Notes
      additionalNotes: ''
    }
  });

  return (
    <FormProvider {...methods}>
      <motion.div 
        className="min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Capa 1: Fondo degradado de colores */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#D602C6] via-[#AA01BC] to-[#6F00FE] opacity-70 -z-10"
          aria-hidden="true"
        />

        {/* Capa 2: Resplandor blanco radial en parte inferior izquierda */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_90%,white_20%,#D602C6_60%,#AA01BC_100%)] opacity-80 blur-sm -z-10"
          aria-hidden="true"
        />

        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10 text-white">
          <FormContainer />
        </main>
        <footer className="text-center py-6 text-black/70 text-sm relative z-10">
          © 2025 Voicemedia.ai Inc - All Rights Reserved
        </footer>
      </motion.div>
    </FormProvider>
  );
}

export default App;
