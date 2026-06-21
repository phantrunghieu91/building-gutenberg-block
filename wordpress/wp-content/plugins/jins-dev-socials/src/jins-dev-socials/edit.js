import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, CheckboxControl } from '@wordpress/components';

import store from '../store';

import './editor.scss';

export default function Edit ( { attributes, setAttributes } ) {
	const socials = useSelect( select => select( store ).getSocials() );


	const { selectedSocialIds } = attributes;
	const handleSelectSocial = ( value, idx ) => {
		if ( true === value && !selectedSocialIds ) {
			setAttributes( { selectedSocialIds: [ idx ] } );
		}
		if ( true === value && selectedSocialIds && !selectedSocialIds.includes( idx ) ) {
			setAttributes( { selectedSocialIds: [ ...selectedSocialIds, idx ] } );
		}
		if ( false === value && selectedSocialIds && selectedSocialIds.includes( idx ) ) {
			setAttributes( { selectedSocialIds: selectedSocialIds.filter( i => i !== idx ) } );
		}
	}

	return (
		<>
			<InspectorControls>
				<PanelBody>
					{ socials.length > 0 && socials.map( ( social, idx ) => (
						<CheckboxControl
							checked={ selectedSocialIds?.includes( idx ) || false }
							key={ `cb-${ social.label }` }
							label={ social.label }
							onChange={ value => handleSelectSocial( value, idx ) }
						/>
					) ) }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ socials.length > 0 && selectedSocialIds?.length > 0 && (
					<ul>
						{ selectedSocialIds.map( (socialIdex ) => (
							<li>
								<img src={socials[socialIdex].icon_url} alt={socials[socialIdex].label} />
							</li>
						) ) }
					</ul>
				) }
			</div>
		</>
	);
}
