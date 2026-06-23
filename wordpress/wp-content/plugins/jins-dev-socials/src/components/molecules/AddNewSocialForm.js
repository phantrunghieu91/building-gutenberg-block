import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';

import store from '../../store';
import { socialSchema } from '../../store/schema';

const AddNewSocialForm = () => {
  const newSocial = useSelect( ( select ) => select( store ).getSocial() );
  const editingSocialIndex = useSelect( ( select ) => select( store ).getSelectedSocialIndex() );

  const isEdit = editingSocialIndex !== null;

  const [ errors, setErrors ] = useState( {} );

  const { setSocial, setSelectedSocialIndex, addSocial, updateSocial } = useDispatch( store );

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
    setSocial( { ...newSocial, icon_id: media.id, icon_url: media.url } );
    setErrors( prev => ( { ...prev, icon_url: undefined } ) );
  }

  const handleCancelEdit = () => {
    setSelectedSocialIndex( null );
    setSocial();
  }

  const handleSubmit = ( event ) => {
    event.preventDefault();

    const result = socialSchema.safeParse( newSocial );

    if ( !result.success ) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors( {
        icon_url: fieldErrors.icon_url?.[ 0 ],
        label: fieldErrors.label?.[ 0 ],
        url: fieldErrors.url?.[ 0 ]
      } );
    } else {
      setErrors( {} );
      editingSocialIndex !== null ? updateSocial() : addSocial();
    }
  }

  const handleChange = ( field, value ) => {
    setSocial( { ...newSocial, [ field ]: value } );
    if ( errors[ field ] ) {
      setErrors( prev => ( { ...prev, [ field ]: undefined } ) );
    }
  }

  return (
    <fieldset class="manage-socials__add-new">
      <legend>{ isEdit ? `Editing '${ newSocial.label }'` : 'Add new social' }</legend>
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
        { errors.icon_url && <p className='error'>{ errors.icon_url }</p> }
      </div>

      <TextControl
        __next40pxDefaultSize
        label="Label"
        placeholder="Ex. Facebook"
        value={ newSocial.label }
        onChange={ ( val ) => handleChange( 'label', val ) }
        help={ errors.label || '' }
        className={ errors.label ? 'has-error' : '' }
      />
      <TextControl
        __next40pxDefaultSize
        label="URL"
        placeholder="Ex. https://facebook.com"
        value={ newSocial.url }
        onChange={ ( val ) => handleChange( 'url', val ) }
        help={ errors.url || '' }
        className={ errors.url ? 'has-error' : '' }
      />
      {
        isEdit ? (
          <>
            <Button __next40pxDefaultSize isPrimary onClick={ handleSubmit }>Edit</Button>
            <Button __next40pxDefaultSize isSecondary onClick={ handleCancelEdit }>Cancel</Button>
          </>
        ) : (
          <Button __next40pxDefaultSize isPrimary onClick={ handleSubmit }>Add Social</Button>
        )
      }
    </fieldset>
  );
}
export default AddNewSocialForm;