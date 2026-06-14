import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';

import store from '../../store';

const EditIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6.249 11.065.44-.44h3.186l-1.5 1.5H7.31l-1.957 1.96A.792.792 0 0 1 4 13.524V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1.5L12.5 8V5.5h-7v6.315l.749-.75ZM20 19.75H7v-1.5h13v1.5Zm0-12.653-8.967 9.064L8 17l.867-2.935L17.833 5 20 7.097Z"></path></svg>);
const RemoveIcon =(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path></svg>);

const SocialsTable = (  ) => {
  const isLoading = useSelect( select => select( store ).getIsLoading() );
  const socials = useSelect( select => select( store ).getSocials() );

  const { removeSocial, setSelectedSocialIndex } = useDispatch( store );

  return (
    <div style={ { overflowX: 'auto' } }>
      <table className="wp-list-table widefat fixed striped socials-table" >
        <thead>
          <tr>
            <th>Icon</th>
            <th>Label</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { isLoading && (
            <tr>
              <td colSpan="4">Loading data...</td>
            </tr>
          ) }
          { socials.length === 0 && !isLoading && (
            <tr>
              <td colSpan="4">No socials added yet.</td>
            </tr>
          ) }
          { !isLoading && socials.map( ( social, index ) => (
            <tr key={ index }>
              <td>
                { social.icon_id ? (
                  <img src={ social.icon_url } alt={ social.label } style={ { width: '32px', height: '32px', objectFit: 'contain' } } />
                ) : '—' }
              </td>
              <td>{ social.label }</td>
              <td><a href={ social.url } target="_blank" rel="noreferrer">{ social.url }</a></td>
              <td>
                <Button icon={ EditIcon } size={'small'} onClick={ () => setSelectedSocialIndex( index ) } iconPosition={'left'}>
                  Edit
                </Button>
                <Button icon={RemoveIcon} size={'small'} isDestructive onClick={ () => removeSocial( index ) }>
                  Remove
                </Button>
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div>
  )
}
export default SocialsTable;