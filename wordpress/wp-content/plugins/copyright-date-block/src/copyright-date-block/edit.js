import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const currentYear = new Date().getFullYear().toString();
	return (
		<p { ...useBlockProps() }>
			{ __(
				`© ${currentYear}`,
				'jin-dev'
			) }
		</p>
	);
}
