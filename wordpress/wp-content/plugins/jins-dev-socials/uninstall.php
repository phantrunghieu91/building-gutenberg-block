<?php 
/**
 * @author Hieu "Jin" Phan Trung
 * @package JinsDev
 * * Handling uninstall the plugin
 */
// If uninstall not called from WordPress, exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

delete_option( 'jins_devs_socials' );
delete_option( 'jins_dev_socials_fe_display_settings' );

flush_rewrite_rules();