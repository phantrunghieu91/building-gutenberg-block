import { useState } from '@wordpress/element';
import { TextControl, Button, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import SocialsTable from '../molecules/SocialsTable';
import AddNewSocialForm from '../molecules/AddNewSocialForm';
import './ManageSocialsTabPanel.scss';

const DEFAULT_NEW_SOCIAL = { icon_id: 0, icon_url: '', label: '', url: '' };

const ManageSocialsTabPanel = ( { title, socials, removeSocial, setSocials, onSave } ) => {
  const [ newSocial, setNewSocial ] = useState( DEFAULT_NEW_SOCIAL );
  const [ editingSocialIndex, SetEditingSocialIndex ] = useState( null );

  const handleAddSocial = () => {
    if ( !newSocial.label || !newSocial.url ) return;
    setSocials( [ ...socials, newSocial ] );
    setNewSocial( DEFAULT_NEW_SOCIAL );
  };

  const handleEdit = ( socialIndex ) => {
    SetEditingSocialIndex( socialIndex );
    setNewSocial( socials[ socialIndex ] );
  };

  const handleUpdateSocials = () => {
    if ( ! newSocial.label || ! newSocial.url ) return;
    const updatedSocials = socials.map( (social, idx) => ( idx === editingSocialIndex ? newSocial : social ) );
    setSocials( updatedSocials );
    SetEditingSocialIndex( null );
    setNewSocial( DEFAULT_NEW_SOCIAL );
  }

  const handleCancelEdit = () => {
    SetEditingSocialIndex( null );
    setNewSocial( DEFAULT_NEW_SOCIAL );
  }

  return (
    <Card className='manage-socials'>
      <CardHeader justify={ 'center' }>
        <h2>{ title }</h2>
      </CardHeader>
      <CardBody>

        <AddNewSocialForm 
          newSocial={ newSocial } setNewSocial={ setNewSocial }  onAddNew={ handleAddSocial } 
          isEdit={ editingSocialIndex !== null } onUpdate={ handleUpdateSocials } onCancelEdit={handleCancelEdit}
        />

        <SocialsTable socials={ socials } onRemove={ removeSocial } onEdit={ handleEdit } />

      </CardBody>
      <CardFooter justify="center">
        <Button style={ { minWidth: '5rem', justifyContent: 'center' } }
          __next40pxDefaultSize isPrimary
          onClick={ onSave }
        >Save</Button>
      </CardFooter>
    </Card>
  )
}
export default ManageSocialsTabPanel;