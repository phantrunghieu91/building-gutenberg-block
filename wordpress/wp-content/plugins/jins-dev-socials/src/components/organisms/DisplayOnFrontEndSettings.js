import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
  ToggleControl, TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Button, Card, CardHeader, CardBody, CardFooter
} from '@wordpress/components';

import store from '../../store';

import './DisplayOnFrontEndSettings.scss';

const DisplayOnFrontEndSettings = ( { title, onSave } ) => {
  const socials = useSelect( ( select ) => select( store ).getSocials() );
  const feDisplaySettings = useSelect( ( select ) => select( store ).getFEDisplaySettings() );
  const { setFEDisplaySettings } = useDispatch( store );

  const [ helpTexts, setHelpTexts ] = useState( {
    icon_size: '',
    spacing_with_vertical_edge: '',
    spacing_with_horizontal_edge: '',
    space_between_items: '',
  } );

  const styleMapping = {
    top: { bottom: 'auto', center: '50%'},
    bottom: { bottom: 'var(--_spacing-with-vertical-edge)', center: 'auto'},
    left: { left: 'var(--_spacing-with-horizontal-edge)', right: 'auto'},
    right: { left: 'auto', right: 'var(--_spacing-with-horizontal-edge)'},
    translate_y: { bottom: '0', center: '-50%'},
    border_radius: { small: '.25rem', medium: '.375rem', large: '.75rem', full: '50%' },
  };

  const previewStyles = {
    '--_spacing-with-horizontal-edge': `${feDisplaySettings.spacing_with_horizontal_edge}px`,
    '--_spacing-with-vertical-edge': `${feDisplaySettings.spacing_with_vertical_edge}px`,
    '--_space-between-items': `${feDisplaySettings.space_between_items}px`,
    '--_icon-size': `${ feDisplaySettings.icon_size }px`,
    '--_icon-border-radius': styleMapping.border_radius[feDisplaySettings.border_corner_style],
    '--_top': styleMapping.top[feDisplaySettings.vertical_position],
    '--_bottom': styleMapping.bottom[feDisplaySettings.vertical_position],
    '--_left': styleMapping.left[feDisplaySettings.horizontal_position],
    '--_right': styleMapping.right[feDisplaySettings.horizontal_position],
    '--_translate-y': styleMapping.translate_y[feDisplaySettings.vertical_position],
  };

  const handleChangeSize = ( value, key = 'icon_size' ) => {
    if( value > 0  && value <= 150 ) {
      setFEDisplaySettings( { ...feDisplaySettings, [key]: value } );
      setHelpTexts({...helpTexts, [key]: ''});
    } else {
      setHelpTexts({...helpTexts, [key]: 'Invalid value'});
    }
  };

  return (
    <Card>
      <CardHeader justify={ 'center' }>
        <h2>{ title }</h2>
      </CardHeader>
      <CardBody>
        <div className="display-settings">
          <ToggleControl
            className="display-settings__visibility"
            checked={ feDisplaySettings.will_display_on_web ?? false }
            label='Will this display on the website?'
            onChange={ () => setFEDisplaySettings( { ...feDisplaySettings, will_display_on_web: !feDisplaySettings.will_display_on_web } ) }
          />
          { feDisplaySettings.will_display_on_web && (
            <div className="display-settings__options-wrapper">
              <div className="display-settings__preview">
                { socials.length > 0 && (
                  <div className="jins-dev-socials" style={ previewStyles }>
                    <ul className="jins-dev-socials__list">
                      { socials.map( ( social, idx ) => (
                        <li className="jins-dev-socials__item" key={ idx }
                          style={ { width: `${ feDisplaySettings.size }px`, height: `${ feDisplaySettings.size }px`, overflow: 'hidden', } }
                        >
                          <a href={ social.url } target="_blank" rel="noopener noreferrer">
                            <img src={ social.icon_url } alt={ social.label } />
                          </a>
                        </li>
                      ) ) }
                    </ul>
                  </div>

                ) }
              </div>
              <div className="display-settings__controllers">
                <fieldset className="display-settings__fields size-spacing">
                  <legend>Size & Spacing (in pixels)</legend>
                  <div className="display-settings__field-group">
                    <TextControl
                      __next40pxDefaultSize
                      label="Icon size"
                      type="number"
                      onChange={ ( value ) => { handleChangeSize( value, 'icon_size' )} }
                      value={ feDisplaySettings.icon_size }
                      placeholder="Icon size"
                      help={ helpTexts.icon_size }
                      required
                    />
                    <TextControl
                      __next40pxDefaultSize
                      label="Spacing with vertical edge"
                      type="number"
                      onChange={ ( value ) => { handleChangeSize( value, 'spacing_with_vertical_edge' )} }
                      value={ feDisplaySettings.spacing_with_vertical_edge }
                      placeholder="Spacing with vertical edge"
                      help={ helpTexts.spacing_with_vertical_edge }
                      required
                    />
                    <TextControl
                      __next40pxDefaultSize
                      label="Spacing with horizontal edge"
                      type="number"
                      onChange={ ( value ) => { handleChangeSize( value, 'spacing_with_horizontal_edge' )} }
                      value={ feDisplaySettings.spacing_with_horizontal_edge }
                      placeholder="Spacing with horizontal edge"
                      help={ helpTexts.spacing_with_horizontal_edge }
                      required
                    />
                    <TextControl
                      __next40pxDefaultSize
                      label="Space between items"
                      type="number"
                      onChange={ ( value ) => { handleChangeSize( value, 'space_between_items' )} }
                      value={ feDisplaySettings.space_between_items }
                      placeholder="Space between items"
                      help={ helpTexts.space_between_items }
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className='display-settings__fields corner-style'>
                  <legend>Corner rounded style</legend>
                  <ToggleGroupControl
                    __next40pxDefaultSize isBlock
                    label="Horizontal position"
                    value={ feDisplaySettings.border_corner_style ?? 'full' }
                    onChange={ ( value ) => setFEDisplaySettings( { ...feDisplaySettings, border_corner_style: value } ) }
                  >
                    <ToggleGroupControlOption value="small" label="Small" />
                    <ToggleGroupControlOption value="medium" label="Medium" />
                    <ToggleGroupControlOption value="large" label="Large" />
                    <ToggleGroupControlOption value="full" label="Full" />
                  </ToggleGroupControl>
                </fieldset>
                <fieldset className='display-settings__fields positions'>
                  <legend>Position</legend>
                  <div className="display-settings__field-group">
                    <ToggleGroupControl
                      __next40pxDefaultSize isBlock
                      label="Vertical position"
                      value={ feDisplaySettings.vertical_position }
                      onChange={ ( value ) => setFEDisplaySettings( { ...feDisplaySettings, vertical_position: value } ) }
                    >
                      <ToggleGroupControlOption value="center" label="Center" />
                      <ToggleGroupControlOption value="bottom" label="Bottom" />
                    </ToggleGroupControl>
                    <ToggleGroupControl
                      __next40pxDefaultSize isBlock
                      label="Horizontal position"
                      value={ feDisplaySettings.horizontal_position }
                      onChange={ ( value ) => setFEDisplaySettings( { ...feDisplaySettings, horizontal_position: value } ) }
                    >
                      <ToggleGroupControlOption value="left" label="Left" />
                      <ToggleGroupControlOption value="right" label="Right" />
                    </ToggleGroupControl>
                  </div>
                </fieldset>
              </div>
            </div>
          ) }
        </div>
      </CardBody>
      <CardFooter justify="center">
        <Button
          __next40pxDefaultSize isPrimary
          onClick={ () => onSave( 'fe_display_settings' ) }
        >Save</Button>
      </CardFooter>
    </Card>
  );
}
export default DisplayOnFrontEndSettings;