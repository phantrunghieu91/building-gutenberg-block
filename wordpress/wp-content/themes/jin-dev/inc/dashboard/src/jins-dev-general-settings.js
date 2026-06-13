import { render } from '@wordpress/element';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const App = () => {
	const [ title, setTitle ] = useState( '' );

	useEffect( async () => {
		const settings = await apiFetch( { path: '/wp/v2/settings' } );
		console.log( settings );
	}, [] );

	const save = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { jins_dev_socials: title },
		} );
	};

	return (
		<PanelBody title="My Settings">
			<TextControl label="Setting Label" value={ title } onChange={ setTitle } />
			<Button isPrimary onClick={ save }>Save</Button>
		</PanelBody>
	);
};

render( <App />, document.getElementById( 'jins-dev-root' ) );
