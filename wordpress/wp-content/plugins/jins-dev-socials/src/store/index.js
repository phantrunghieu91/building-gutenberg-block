import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';
import TYPES from './types';

const DEFAULT_STATE = {
  isLoading: false,
  socials: [],
  social: { icon_id: 0, icon_url: '', label: '', url: '' },
  selectedSocialIndex: null,
  feDisplaySettings: {
    will_display_on_web: false,
    horizontal_position: 'right',
    vertical_position: 'bottom',
    icon_size: 24,
    spacing_with_horizontal_edge: 20,
    spacing_with_vertical_edge: 20,
    space_between_items: 10,
    border_corner_style: 'full', // small, medium, large, full
  },
};

const actions = {
  setIsLoading: ( loadingState ) => ( { type: TYPES.SET_IS_LOADING, loadingState } ),
  setSocials: ( socials ) => ( { type: TYPES.SET_SOCIALS, socials } ),
  setSocial: ( newSocial ) => ( { type: TYPES.SET_SOCIAL, newSocial } ),
  setSelectedSocialIndex: ( index ) => ( { type: TYPES.SET_SELECTED_SOCIAL_INDEX, index } ),
  addSocial: () => ( { type: TYPES.ADD_SOCIAL } ),
  removeSocial: ( index ) => ( { type: TYPES.REMOVE_SOCIAL, index } ),
  updateSocial: () => ( { type: TYPES.UPDATE_SOCIAL } ),
  saveSocials: async ( socials ) => {
    await apiFetch( {
      path: 'wp/v2/settings',
      method: 'POST',
      data: { jins_dev_socials: socials },
    } );
  },
  setFEDisplaySettings: ( settings ) => ( { type: TYPES.SET_FE_DISPLAY_SETTINGS, settings } ),
  saveFEDisplaySettings: async( settings ) => {
    await apiFetch( {
      path: 'wp/v2/settings',
      method: 'POST',
      data: { jins_dev_socials_fe_display_settings: settings }
    })
  }
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case TYPES.SET_IS_LOADING:
      return { ...state, isLoading: action.loadingState };
    case TYPES.SET_SOCIALS:
      return { ...state, socials: action.socials };
    case TYPES.SET_SOCIAL:
      return action.newSocial === 'undefined' ? { ...state, social: DEFAULT_STATE.social } : { ...state, social: action.newSocial };
    case TYPES.SET_SELECTED_SOCIAL_INDEX:
      return { ...state, selectedSocialIndex: action.index, social: state.socials[ action.index ] };
    case TYPES.ADD_SOCIAL:
      return { ...state, socials: [ ...state.socials, state.social ] };
    case TYPES.REMOVE_SOCIAL:
      return { ...state, socials: state.socials.filter( ( _, i ) => i !== action.index ) };
    case TYPES.UPDATE_SOCIAL:
      return {
        ...state,
        socials: state.socials.map( ( s, i ) => i === state.selectedSocialIndex ? state.social : s ),
        social: DEFAULT_STATE.social,
        selectedSocialIndex: null,
      };
    case TYPES.SET_FE_DISPLAY_SETTINGS:
      return { ...state, feDisplaySettings: action.settings };
    default:
      return state;
  }
};

const selectors = {
  getIsLoading: ( state ) => state.isLoading,
  getSocials: ( state ) => state.socials,
  getSocial: ( state ) => state.social,
  getSelectedSocialIndex: ( state ) => state.selectedSocialIndex,
  getFEDisplaySettings: ( state ) => state.feDisplaySettings,
};

const resolvers = {
  getSocials: async () => {
    actions.setIsLoading( true );
    const settings = await apiFetch( { path: '/wp/v2/settings' } );
    actions.setIsLoading( false );
    return actions.setSocials( settings.jins_dev_socials ?? [] );
  },
  getFEDisplaySettings: async () => {
    actions.setIsLoading( true );
    const settings = await apiFetch( { path: '/wp/v2/settings' } );
    actions.setIsLoading( false );
    return actions.setFEDisplaySettings( settings.jins_dev_socials_fe_display_settings ?? state.feDisplaySettings );
  }
}

const store = createReduxStore( 'jins-dev-socials', { reducer, actions, selectors, resolvers } );
register( store );

export default store;