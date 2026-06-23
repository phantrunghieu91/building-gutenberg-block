import { __ } from '@wordpress/i18n';
import { z } from 'zod';

const socialSchema = z.object({
  icon_id: z.number(),
  icon_url: z.string().url(__('Please select an icon', 'jins-dev-socials')),
  label: z.string().min(1, __('Label is required', 'jins-dev-socials')),
  url: z.string().url(__('Please enter valid url', 'jins-dev-socials'))
});

const socialsSchema = z.array( socialSchema );

export {
  socialSchema,
  socialsSchema,
}