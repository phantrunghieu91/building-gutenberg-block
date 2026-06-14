<?php
/**
 * Plugin Name:       Jins Dev Socials
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jins-dev-socials
 *
 * @package JinsDev
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
require_once plugin_dir_path() . '/inc/register-options-pages.php';
function jins_dev_jins_dev_socials_block_init() {
  new JinsRegisteringOptionsPages();
  wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
function plugin_activate() {
  add_action( 'init', 'jins_dev_jins_dev_socials_block_init' );
  flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'plugin_activate' );

function plugin_deactivate() {
  flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'plugin_deactivate' );
