<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$socials = get_option('jins_dev_socials', []);
$default_style_settings = get_option( 'jins_dev_socials_fe_display_settings', []);
$selected_socials_ids = $attributes['selectedSocialIds'] ?? [];
if( empty($selected_socials_ids) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes(); ?> >
	<ul>
		<?php foreach( $selected_socials_ids as $social_id ) : 
			$social = $socials[$social_id];
		?>
			<li>
				<img src="<?= esc_url( $social['icon_url']) ?>" alt="<?= esc_attr( $social['label']) ?>">
			</li>
		<?php endforeach ?>
	</ul>
</div>
