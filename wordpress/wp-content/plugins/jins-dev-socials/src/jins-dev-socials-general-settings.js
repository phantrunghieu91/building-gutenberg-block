import { render } from '@wordpress/element';
import { TabPanel, TextControl, Button, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import ManageSocialsTabPanel from './components/organisms/ManageSocialsTabPanel';

import './jins-dev-socials-general-settings.scss';

const App = () => {
	const [ socials, setSocials ] = useState( [] );
	const [ newSocial, setNewSocial ] = useState( { icon_id: 0, icon_url: '', label: '', url: '' } );
	const { createSuccessNotice, createErrorNotice, removeNotice } = useDispatch( noticesStore );
	const notices = useSelect( ( select ) => select( noticesStore ).getNotices() );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			setSocials( settings.jins_dev_socials ?? [] );
		} );
	}, [] );

	const saveSocials = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { jins_dev_socials: socials },
		} )
			.then( () => {
				createSuccessNotice( 'Socials saved successfully!', { type: 'snackbar' } );
			} )
			.catch( () => {
				createErrorNotice( 'Failed to save socials.', { type: 'snackbar' } );
			} );
	};

	const removeSocial = ( index ) => {
		setSocials( socials.filter( ( _, i ) => i !== index ) );
	};

	return (
		<div className="wrap">
			<SnackbarList
				notices={ notices }
				className="components-editor-notices__snackbar"
				onRemove={ ( id ) => removeNotice( id ) }
			/>
			<TabPanel
				tabs={ [
					{ name: 'manage-socials', title: 'Manage Socials' },
					{ name: 'display-settings', title: 'Display On Front-end Settings' },
				] }
			>
				{ ( tab ) => (
					<>
						{ tab.name === 'manage-socials' && (
							<ManageSocialsTabPanel 
								title={tab.title}
								removeSocial={removeSocial}
								setSocials={setSocials}
								socials={socials}
								onSave={saveSocials}
							/>
						) }

						{ tab.name === 'display-settings' && ( 
							<Card>
								<CardHeader justify={'center'}>
									<h2>{ tab.title }</h2>
								</CardHeader>
								<CardBody></CardBody>
								<CardFooter>
									<CardFooter justify="center">
										<Button style={ { minWidth: '5rem', justifyContent: 'center' } } 
											__next40pxDefaultSize isPrimary 
											onClick={ null }
										>Save</Button>
									</CardFooter>
								</CardFooter>
							</Card>
						) }
					</>
				) }

			</TabPanel>
		</div>
	);
};

render( <App />, document.getElementById( 'jins-dev-root' ) );