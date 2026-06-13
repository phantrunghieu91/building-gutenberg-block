<?php
function register_style_for_buttons_block() {
  wp_enqueue_style( 'jins-wp-block-button', 
    get_theme_file_uri( strstr( __DIR__, 'inc/') . '/style.css' ), [], null, 'all' );
  register_block_style( 'core/button', [
    'name'         => 'gradient-bg',
    'label'        => 'Gradient BG',
    'style_handle' => 'jins-wp-block-button'
  ] );
}

add_action( 'init', 'register_style_for_buttons_block' );