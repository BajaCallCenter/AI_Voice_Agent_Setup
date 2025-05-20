import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';
import TextareaField from '../TextareaField';

const Performance: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const reportFrequency = watch('reportFrequency');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Specify how you want to track and review your AI Agent's performance.
      </p>

      <TextareaField
        label="What key performance indicators (KPIs) do you want to track?"
        name="trackingKPIs"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="e.g., Average handling time, Customer satisfaction, Call completion rates"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          How frequently do you need performance reports? <span className="text-error-500">*</span>
        </label>
        <select
          {...register('reportFrequency', { required: "This field is required" })}
          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Other">Other</option>
        </select>
        {errors.reportFrequency && (
          <p className="text-error-500 text-sm mt-1">{errors.reportFrequency.message as string}</p>
        )}
      </div>

      {reportFrequency === 'Other' && (
        <FormField
          label="Please specify reporting frequency"
          name="otherReportFrequency"
          register={register}
          required
          errors={errors}
          placeholder="Enter custom reporting frequency"
        />
      )}
    </div>
  );
};

export default Performance;