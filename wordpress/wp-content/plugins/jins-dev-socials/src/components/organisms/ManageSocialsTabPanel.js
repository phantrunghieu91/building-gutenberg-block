import { TextControl, Button, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import SocialsTable from '../molecules/SocialsTable';
import AddNewSocialForm from '../molecules/AddNewSocialForm';
import './ManageSocialsTabPanel.scss';

const ManageSocialsTabPanel = ({ title, socials, removeSocial, setSocials, onSave }) => {

	const addSocial = ( newSocial ) => {
		if ( !newSocial.label || !newSocial.url ) return;
		setSocials( [ ...socials, newSocial ] );
	};

  return (
    <Card className='manage-socials'>
      <CardHeader justify={'center'}>
        <h2>{ title }</h2>
      </CardHeader>
      <CardBody>
        <AddNewSocialForm onAddNew={addSocial} />
        <SocialsTable socials={ socials } onRemove={ removeSocial } />
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