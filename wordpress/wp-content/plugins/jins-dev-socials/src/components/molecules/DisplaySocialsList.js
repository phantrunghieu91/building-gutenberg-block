import { useSelect } from '@wordpress/data';
import store from '../../store';

const isOnFrontEnd = typeof jins_dev_socials !== 'undefined';

const DisplaySocialsList = () => {
  const socialsFromStore = useSelect( select => select( store ).getSocials() );
  const feDisplaySettingsFromStore = useSelect( select => select( store ).getFEDisplaySettings() );

  const socials = isOnFrontEnd ? jins_dev_socials.socials : socialsFromStore;
  const feDisplaySettings = isOnFrontEnd ? jins_dev_socials.feDisplaySettings : feDisplaySettingsFromStore;

  const styleMapping = {
    top: { bottom: 'auto', center: '50%' },
    bottom: { bottom: `${feDisplaySettings.spacing_with_vertical_edge}px`, center: 'auto' },
    left: { left: `${feDisplaySettings.spacing_with_horizontal_edge}px`, right: 'auto' },
    right: { left: 'auto', right: `${feDisplaySettings.spacing_with_horizontal_edge}px` },
    translate_y: { bottom: '0', center: '-50%' },
    border_radius: { small: '.25rem', medium: '.375rem', large: '.75rem', full: '50%' },
  };

  const containerStyles = {
    position: 'absolute',
    top: styleMapping.top[ feDisplaySettings.vertical_position ],
    bottom: styleMapping.bottom[ feDisplaySettings.vertical_position ],
    left: styleMapping.left[ feDisplaySettings.horizontal_position ],
    right: styleMapping.right[ feDisplaySettings.horizontal_position ],
    translate: `0% ${styleMapping.translate_y[ feDisplaySettings.vertical_position ]}`,
  }

  return (
    <div className="jins-dev-socials" style={ containerStyles }>
      <ul className="jins-dev-socials__list"
        style={ { listStyle: 'none', display: 'flex', flexDirection: 'column', marginBlock: 0, gap: `${ feDisplaySettings.space_between_items }px` } }
      >
        { socials.map( ( social, idx ) => (
          <li className="jins-dev-socials__item" key={ idx } style={ { marginBlockEnd: 0 } }>
            <a href={ social.url } target="_blank" rel="noopener noreferrer">
              <img src={ social.icon_url } alt={ social.label }
                style={ {
                  display: 'block', width: `${ feDisplaySettings.icon_size }px`, 
                  height: `${ feDisplaySettings.icon_size }px`, borderRadius: styleMapping.border_radius[ feDisplaySettings.border_corner_style ]
                } }
              />
            </a>
          </li>
        ) ) }
      </ul>
    </div>
  )
}
export default DisplaySocialsList;