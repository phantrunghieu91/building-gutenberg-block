import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, Button } from '@wordpress/components';

import store from '../../store';

const AddNewSocialForm = (  ) => {
  const newSocial = useSelect( (select) => select( store ).getSocial());
  const editingSocialIndex = useSelect( (select) => select( store ).getSelectedSocialIndex() );

  const isEdit = editingSocialIndex !== null;

  const { setSocial: setNewSocial, setSelectedSocialIndex, addSocial, updateSocial } = useDispatch( store );

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

  const handleSelectIcon = ( media ) => {
    setNewSocial( { ...newSocial, icon_id: media.id, icon_url: media.url });
  }

  const handleCancelEdit = () => {
    setSelectedSocialIndex( null );
    setNewSocial();
  }

  return (
    <fieldset class="manage-socials__add-new">
      <legend>{ isEdit ? `Editing '${newSocial.label}'` : 'Add new social' }</legend>
      <div class="manage-socials__add-new-img-wrapper">
        <span>ICON</span>
        { newSocial.icon_id ? (
          <img class="manage-socials__add-new-img" src={ newSocial.icon_url } alt="icon" />
        ) : (
          <div class="manage-socials__add-new-placeholder" />
        ) }
        <Button __next40pxDefaultSize isSecondary onClick={ () => openMediaPicker( handleSelectIcon ) }>
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
      {
        isEdit ? (
          <>
            <Button __next40pxDefaultSize isPrimary onClick={ updateSocial }>Edit</Button>
            <Button __next40pxDefaultSize isSecondary onClick={ handleCancelEdit }>Cancel</Button>
          </>
          ) : (
          <Button __next40pxDefaultSize isPrimary onClick={ addSocial }>Add Social</Button>
        )
      }
    </fieldset>
  );
}
export default AddNewSocialForm;