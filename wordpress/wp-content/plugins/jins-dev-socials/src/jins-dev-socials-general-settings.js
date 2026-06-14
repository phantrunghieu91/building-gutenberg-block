import { render } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { TabPanel, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import { SnackbarList } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import ManageSocialsTabPanel from './components/organisms/ManageSocialsTabPanel';

import './jins-dev-socials-general-settings.scss';

import store from './store';

const App = () => {
	const { createSuccessNotice, createErrorNotice, removeNotice } = useDispatch( noticesStore );
	const notices = useSelect( ( select ) => select( noticesStore ).getNotices() );

	const socials = useSelect( ( select ) => select( store ).getSocials() );
	const { saveSocials } = useDispatch( store );

	const handleSave = async () => {
		try {
			await saveSocials( socials );
			createSuccessNotice( 'Socials saved successfully!', { type: 'snackbar' } );
		} catch ( error ) {
			createErrorNotice( 'Failed to save socials.', { type: 'snackbar' } );
			console.log( 'SAVING ERROR: ', error );
		}
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
								title={ tab.title } onSave={ handleSave }
							/>
						) }

						{ tab.name === 'display-settings' && (
							<Card>
								<CardHeader justify={ 'center' }>
									<h2>{ tab.title }</h2>
								</CardHeader>
								<CardBody></CardBody>
								<CardFooter>
									<CardFooter justify="center">
										<Button
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