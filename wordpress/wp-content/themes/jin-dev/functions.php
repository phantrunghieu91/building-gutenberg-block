<?php 

require_once __DIR__ . '/inc/RegisterBlocks.php';
new RegisterBlocks();

function theme_styles() {
  wp_enqueue_style( 'global', get_template_directory_uri() . '/assets/css/global.css', [], null, 'all');
}
add_action('wp_enqueue_scripts', 'theme_styles');