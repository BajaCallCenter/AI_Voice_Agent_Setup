import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';

const AgentPersonality: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const agentType = watch('agentType');
  const agentTasks = watch('agentTasks') || [];

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Define your AI Voice Agent's personality and functionality.
      </p>

      <FormField
        label="What tone should your AI Agent reflect?"
        name="agentTone"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Calm & Reassuring, Luxury & Premium, Persuasive"
      />

      <CheckboxGroup
        label="What tasks should the AI Voice Agent handle?"
        name="agentTasks"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Customer Inquiries", label: "Customer Inquiries" },
          { value: "Sales and Lead Generation", label: "Sales and Lead Generation" },
          { value: "Appointment Scheduling", label: "Appointment Scheduling" },
          { value: "Order Processing", label: "Order Processing" },
          { value: "Payment Collection", label: "Payment Collection" },
          { value: "Technical Support", label: "Technical Support" },
          { value: "Other", label: "Other" }
        ]}
      />

      {agentTasks.includes('Other') && (
        <FormField
          label="Please specify other tasks"
          name="otherAgentTask"
          register={register}
          required
          errors={errors}
          placeholder="Enter other tasks"
        />
      )}

      <RadioGroup
        label="Will the AI Agent need to transfer calls to a live representative?"
        name="needCallTransfer"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" }
        ]}
      />

      <FormField
        label="What languages should the AI Voice Agent support?"
        name="supportedLanguages"
        register={register}
        required
        errors={errors}
        placeholder="e.g., English, Spanish, French"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Agent Type (Select industry-based AI role): <span className="text-error-500">*</span>
        </label>
        <select
          {...register('agentType', { required: "This field is required" })}
          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select agent type</option>
          <option value="Customer Service AI">Customer Service AI</option>
          <option value="Sales Representative AI">Sales Representative AI</option>
          <option value="Appointment Scheduler AI">Appointment Scheduler AI</option>
          <option value="Technical Support AI">Technical Support AI</option>
          <option value="E-commerce AI Assistant">E-commerce AI Assistant</option>
          <option value="Other">Other</option>
        </select>
        {errors.agentType && (
          <p className="text-error-500 text-sm mt-1">{errors.agentType.message as string}</p>
        )}
      </div>

      {agentType === 'Other' && (
        <FormField
          label="Please specify other agent type"
          name="otherAgentType"
          register={register}
          required
          errors={errors}
          placeholder="Enter other agent type"
        />
      )}
    </div>
  );
};

export default AgentPersonality;