import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

export default function Edit( {attributes, setAttributes} ) {
	const { showStartingYear, startingYear } = attributes;
	const currentYear = new Date().getFullYear().toString();
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl 
						checked={ showStartingYear }
						label={__('Show starting year', 'jin-dev')}
						onChange={ () => { setAttributes( { showStartingYear: !showStartingYear} ) }}
					/>
					{ showStartingYear && <TextControl 
						__next40pxDefaultSize
						value={ startingYear || '' }
						placeholder={__('Enter year, ex. 2011', 'jin-dev')}
						onChange={ value => setAttributes( { startingYear: value } ) }
					/> }
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				{ showStartingYear && startingYear ? `© ${startingYear} - ${currentYear}` : `© ${currentYear}` }
			</p>
		</>
	);
}
