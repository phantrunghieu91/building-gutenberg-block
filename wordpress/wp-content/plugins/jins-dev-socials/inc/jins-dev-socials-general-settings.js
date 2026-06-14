import { render } from '@wordpress/element';
import { TabPanel, TextControl, Button, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

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

	const saveNewSocial = () => {
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

	const addSocial = () => {
		if ( !newSocial.label || !newSocial.url ) return;
		setSocials( [ ...socials, newSocial ] );
		setNewSocial( { icon_id: 0, icon_url: '', label: '', url: '' } );
	};

	const removeSocial = ( index ) => {
		setSocials( socials.filter( ( _, i ) => i !== index ) );
	};

	const openMediaPicker = ( onSelect ) => {
		const frame = wp.media( {
			title: 'Select Icon',
			button: { text: 'Use this icon' },
			multiple: false,
			library: { type: 'image' },
		} );

		frame.on( 'select', () => {
			const attachment = frame.state().get( 'selection' ).first().toJSON();
			onSelect( attachment );
		} );

		frame.open();
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
				onSelect={ ( tabName ) => console.log( 'Selecting: ', tabName ) }
			>
				{ ( tab ) => (
					<>
						{ tab.name === 'manage-socials' && (
							<Card>
								<CardHeader>
									<h2>{ tab.title }</h2>
								</CardHeader>
								<CardBody>
									<div style={ { overflowX: 'auto' } }>
										<table className="wp-list-table widefat fixed striped" style={ { minWidth: '37.5rem' } } >
											<thead>
												<tr>
													<th>Icon</th>
													<th>Label</th>
													<th>URL</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{ socials.length === 0 && (
													<tr>
														<td colSpan="4">No socials added yet.</td>
													</tr>
												) }
												{ socials.map( ( social, index ) => (
													<tr key={ index }>
														<td>
															{ social.icon_id ? (
																<img src={ social.icon_url } alt={ social.label } style={ { width: '32px', height: '32px', objectFit: 'contain' } } />
															) : '—' }
														</td>
														<td>{ social.label }</td>
														<td><a href={ social.url } target="_blank" rel="noreferrer">{ social.url }</a></td>
														<td>
															<Button isDestructive isSmall onClick={ () => removeSocial( index ) }>
																Remove
															</Button>
														</td>
													</tr>
												) ) }
											</tbody>
										</table>
									</div>

									<div style={ { marginTop: '16px', gap: '8px', display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-end', justifyContent: 'center' } }>
										<div style={ { display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' } }>
											<span style={ { textTransform: 'uppercase', fontSize: '11px', flex: '1 0 100%' } }>ICON</span>
											{ newSocial.icon_id ? (
												<img src={ newSocial.icon_url } alt="icon" style={ { width: '40px', height: '40px', objectFit: 'contain' } } />
											) : (
												<div style={ { width: '40px', height: '40px', background: 'hsl(from #4058E9 h s l / .25)' } } />
											) }
											<Button style={ { minWidth: '5rem', justifyContent: 'center' } } __next40pxDefaultSize isSecondary onClick={ () => openMediaPicker( ( media ) => {
												setNewSocial( { ...newSocial, icon_id: media.id, icon_url: media.url } );
											} ) }>
												{ newSocial.icon_id ? 'Change' : 'Select' }
											</Button>
										</div>

										<TextControl
											__next40pxDefaultSize
											label="Label"
											placeholder="Facebook"
											value={ newSocial.label }
											onChange={ ( val ) => setNewSocial( { ...newSocial, label: val } ) }
										/>
										<TextControl
											__next40pxDefaultSize
											label="URL"
											placeholder="https://facebook.com"
											value={ newSocial.url }
											onChange={ ( val ) => setNewSocial( { ...newSocial, url: val } ) }
										/>
										<Button style={ { minWidth: '5rem', justifyContent: 'center' } } __next40pxDefaultSize isPrimary onClick={ addSocial }>Add Social</Button>
									</div>
								</CardBody>
								<CardFooter justify="center">
									<Button style={ { minWidth: '5rem', justifyContent: 'center' } } 
										__next40pxDefaultSize isPrimary 
										onClick={ saveNewSocial }
									>Save</Button>
								</CardFooter>
							</Card>
						) }

						{ tab.name === 'display-settings' && ( 
							<Card>
								<CardHeader>
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