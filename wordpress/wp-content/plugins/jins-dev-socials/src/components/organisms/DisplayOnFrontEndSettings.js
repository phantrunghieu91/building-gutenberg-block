import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
  ToggleControl, TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Button, Card, CardHeader, CardBody, CardFooter
} from '@wordpress/components';

import store from '../../store';

import '../../styles/DisplayOnFrontEndSettings.scss';
import DisplaySocialsList from '../molecules/DisplaySocialsList';

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

  const handleChangeSize = ( value, key = 'icon_size' ) => {
    if( value > 0  && value <= 150 ) {
      setFEDisplaySettings( { ...feDisplaySettings, [key]: value } );
      setHelpTexts({...helpTexts, [key]: ''});
    } else {
      setFEDisplaySettings( {...feDisplaySettings, [key]: value < 0 ? 0 : 150 })
      setHelpTexts({...helpTexts, [key]: 'Must be between 1 and 150'});
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
                { socials.length > 0 && < DisplaySocialsList /> }
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