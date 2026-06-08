import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes } ) {
	const TEMPLATE = [
		[ 'core/heading', { level: 2, placeholder: __('Section title...', 'jin-section-block') } ]
	];

	const blockProps = useBlockProps({ className: 'jin-section' });
	const innerBlocksProps = useInnerBlocksProps({
		allowedBlocks: attributes.allowedBlocks,
		template: TEMPLATE,
		templateLock: false,
	});

	return (
		<section { ...blockProps }>
			<div className='jin-section__inner' { ...innerBlocksProps } />
		</section>
	);
}
