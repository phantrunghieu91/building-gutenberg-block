<?php
/**
 * Plugin Name:       Jins Dev Socials
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Hieu "Jin" Phan Trung
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jins-dev-socials
 *
 * @package JinsDev
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
define( 'PLUGIN_JINS_DEV_SOCIALS_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_JINS_DEV_SOCIALS_URI', plugin_dir_url( __FILE__ ) );

// Register option page for setup socials globally
require_once __DIR__ . '/inc/register-options-pages.php';
$option_page_instance = new JinsRegisteringOptionsPages();

function jins_dev_socials_block_init() {
  wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
function jins_dev_socials_display_on_website() {
  $settings = get_option( 'jins_dev_socials_fe_display_settings' );
  if( isset( $settings['will_display_on_web'] ) && true === $settings['will_display_on_web'] ) {
    add_action( 'wp_enqueue_scripts', function() {
      $asset_file = include_once PLUGIN_JINS_DEV_SOCIALS_PATH . "/build/jins-dev-socials-front-end.asset.php";
      wp_enqueue_script( 'jins-dev-socials-front-end',
        PLUGIN_JINS_DEV_SOCIALS_URI . '/build/jins-dev-socials-front-end.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
      );
      wp_localize_script('jins-dev-socials-front-end', 'jins_dev_socials', [
        'socials' => get_option('jins_dev_socials', []),
        'feDisplaySettings' => get_option('jins_dev_socials_fe_display_settings', []),
      ]);
    } );
    add_action( 'wp_footer', function() {
      echo '<div id="jins-dev-socials-root"></div>';
    } );
  }
}
add_action( 'init', 'jins_dev_socials_display_on_website' );
add_action( 'init', 'jins_dev_socials_block_init' );
function plugin_activate() {
  flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'plugin_activate' );

function plugin_deactivate() {
  remove_action( 'init', 'jins_dev_socials_block_init' );
  remove_action( 'init', 'jins_dev_socials_display_on_website' );
  flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'plugin_deactivate' );
