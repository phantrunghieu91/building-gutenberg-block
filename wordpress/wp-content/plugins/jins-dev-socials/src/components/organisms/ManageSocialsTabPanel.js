import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, Button, Card, CardHeader, CardBody, CardFooter } from '@wordpress/components';
import SocialsTable from '../molecules/SocialsTable';
import AddNewSocialForm from '../molecules/AddNewSocialForm';
import './ManageSocialsTabPanel.scss';

const ManageSocialsTabPanel = ( { title, onSave } ) => {
  return (
    <Card className='manage-socials'>
      <CardHeader justify={ 'center' }>
        <h2>{ title }</h2>
      </CardHeader>
      <CardBody>

        <AddNewSocialForm />

        <SocialsTable />

      </CardBody>
      <CardFooter justify="center">
        <Button __next40pxDefaultSize isPrimary onClick={ onSave } >Save</Button>
      </CardFooter>
    </Card>
  )
}
export default ManageSocialsTabPanel;