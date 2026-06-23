import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, CheckboxControl } from '@wordpress/components';

import store from '../store';

import './editor.scss';

export default function Edit ( { attributes, setAttributes } ) {
	const socials = useSelect( select => select( store ).getSocials() );

	const { selectedSocials } = attributes;
	const initializeSelectedSocials = socials.length > 0 && ( selectedSocials?.length === socials.length ) 
		? selectedSocials 
		: new Array( socials.length ).fill( false );

	const handleSelectSocial = ( value, idx ) => {
		setAttributes( {
			selectedSocials: initializeSelectedSocials.map( ( isSelected, selectedIdx ) => selectedIdx === idx ? value : isSelected ),
		} );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody>
					{ socials.length > 0 && socials.map( ( social, idx ) => (
						<CheckboxControl
							checked={ selectedSocials && selectedSocials[ idx ] || false }
							key={ `cb-${ social.label }` }
							label={ social.label }
							onChange={ value => handleSelectSocial( value, idx ) }
						/>
					) ) }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ socials.length > 0 && selectedSocials?.length > 0 && (
					<ul>
						{ selectedSocials.map( ( isSelected, socialIndex ) => (
							isSelected && <li>
								<img src={ socials[ socialIndex ].icon_url } alt={ socials[ socialIndex ].label } />
							</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
