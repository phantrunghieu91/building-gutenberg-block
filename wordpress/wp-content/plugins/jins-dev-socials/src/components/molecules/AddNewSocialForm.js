import { useState } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';

const AddNewSocialForm = ( { onAddNew } ) => {
  const DEFAULT_NEW_SOCIAL = { icon_id: 0, icon_url: '', label: '', url: '' };
  const [ newSocial, setNewSocial ] = useState( DEFAULT_NEW_SOCIAL );
  const [ buttonAction, setButtonAction ] = useState( 'add_new' );  // add_new || edit

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

  const handleAddNewSocial = () => {
    switch( buttonAction ) {
      case 'edit':
        console.log('Save edit');
        break;
      default:
        onAddNew(newSocial);
        break;
      }
      setNewSocial( DEFAULT_NEW_SOCIAL );
  }

  return (
    <fieldset class="manage-socials__add-new">
      <legend>{ buttonAction === 'add_new' ? 'Add new social' : `Editing ${newSocial.label}`}</legend>
      <div class="manage-socials__add-new-img-wrapper">
        <span>ICON</span>
        { newSocial.icon_id ? (
          <img class="manage-socials__add-new-img" src={ newSocial.icon_url } alt="icon" />
        ) : (
          <div class="manage-socials__add-new-placeholder" />
        ) }
        <Button __next40pxDefaultSize isSecondary onClick={ () => openMediaPicker( ( media ) => {
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
      <Button
        style={ { minWidth: '5rem', justifyContent: 'center' } }
        __next40pxDefaultSize isPrimary onClick={ handleAddNewSocial }
      >Add Social</Button>
    </fieldset>
  );
}
export default AddNewSocialForm;