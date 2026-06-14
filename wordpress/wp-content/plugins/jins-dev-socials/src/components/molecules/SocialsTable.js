import { Button } from '@wordpress/components';
const SocialsTable = ( { socials, onRemove } ) => {
  return (
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
                <Button isDestructive isSmall onClick={ () => onRemove( index ) }>
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