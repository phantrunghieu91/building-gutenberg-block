<?php

require_once __DIR__ . '/inc/register-blocks.php';
new RegisterBlocks();
add_action( 'wp_head', function() {
  echo '<style id="jins-layers-level">@layer wp-global, reset, base, utilities, components;</style>';
}, 5 );
add_action( 'wp_enqueue_scripts', function() {
  // 1. Get the generated stylesheet from WP
  $stylesheet = wp_get_global_stylesheet();
  if ( empty( $stylesheet ) ) return;

  $wrapped_stylesheet = sprintf( '@layer wp-global { %s }', $stylesheet );

  // 2. Remove the default output
  wp_dequeue_style( 'global-styles' );
  wp_deregister_style( 'global-styles' );

  // 3. Register a new handle and add the wrapped CSS
  wp_register_style( 'wrapped-global-styles', false );
  wp_add_inline_style( 'wrapped-global-styles', $wrapped_stylesheet );
  wp_enqueue_style( 'wrapped-global-styles' );
}, 20 ); // Priority 20 ensures it runs after core styles are registered
function theme_styles() {
  wp_enqueue_style( 'global', get_template_directory_uri() . '/assets/css/global.css', [], null, 'all' );
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );