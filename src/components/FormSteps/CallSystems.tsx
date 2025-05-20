import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import FormField from '../FormField';

const CallSystems: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const phoneSystem = watch('phoneSystem');
  const selectedCRM = watch('crm') || [];

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Tell us about your current systems and integration needs.
      </p>

      <RadioGroup
        label="Which phone system do you currently use?"
        name="phoneSystem"
        register={register}
        required
        errors={errors}
        options={[
          { value: "RingCentral", label: "RingCentral" },
          { value: "8x8", label: "8x8" },
          { value: "Zoom Phone", label: "Zoom Phone" },
          { value: "Vonage Business", label: "Vonage Business" },
          { value: "Twilio", label: "Twilio" },
          { value: "Nextiva", label: "Nextiva" },
          { value: "GoTo Connect", label: "GoTo Connect (formerly Jive)" },
          { value: "Microsoft Teams Phone", label: "Microsoft Teams Phone" },
          { value: "Cisco Webex Calling", label: "Cisco Webex Calling" },
          { value: "Grasshopper", label: "Grasshopper" },
          { value: "Vicidial", label: "Vicidial" },
          { value: "Five9", label: "Five9" },
          { value: "Amazon Connect", label: "Amazon Connect (AWS Connect)" },
          { value: "In-house PBX", label: "In-house PBX" },
          { value: "Not sure", label: "Not sure" },
          { value: "Other", label: "Other" }
        ]}
      />

      {phoneSystem === 'Other' && (
        <FormField
          label="Please specify your phone system"
          name="otherPhoneSystem"
          register={register}
          required
          errors={errors}
          placeholder="Enter your phone system"
        />
      )}

      <CheckboxGroup
        label="Do you use any CRM, helpdesk, or order management software we may need to integrate with?"
        name="crm"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Salesforce", label: "Salesforce" },
          { value: "HubSpot", label: "HubSpot" },
          { value: "Zendesk", label: "Zendesk" },
          { value: "Zoho CRM / Desk", label: "Zoho CRM / Desk" },
          { value: "Freshdesk", label: "Freshdesk" },
          { value: "ServiceNow", label: "ServiceNow" },
          { value: "Intercom", label: "Intercom" },
          { value: "Help Scout", label: "Help Scout" },
          { value: "Monday.com", label: "Monday.com" },
          { value: "Pipedrive", label: "Pipedrive" },
          { value: "Shopify", label: "Shopify" },
          { value: "ResponseCRM", label: "ResponseCRM" },
          { value: "Konnektive", label: "Konnektive" },
          { value: "Sticky.io", label: "Sticky.io" },
          { value: "29Next", label: "29Next" },
          { value: "None", label: "None" },
          { value: "Not sure", label: "Not sure" },
          { value: "Other", label: "Other" }
        ]}
      />

      {selectedCRM.includes('Other') && (
        <FormField
          label="Please specify other systems"
          name="otherCRM"
          register={register}
          required
          errors={errors}
          placeholder="Enter other systems to integrate"
        />
      )}
    </div>
  );
};

export default CallSystems;