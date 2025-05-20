import React from 'react';
import { useFormContext } from 'react-hook-form';
import CheckboxGroup from '../CheckboxGroup';

const SecurityCompliance: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Specify your security and compliance requirements.
      </p>

      <CheckboxGroup
        label="Do you require compliance with any of the following?"
        name="compliance"
        register={register}
        required
        errors={errors}
        options={[
          { value: "HIPAA", label: "HIPAA" },
          { value: "PCI", label: "PCI" },
          { value: "SOC 2", label: "SOC 2" },
          { value: "GDPR", label: "GDPR" },
          { value: "No special requirements", label: "No special requirements" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />
    </div>
  );
};

export default SecurityCompliance;