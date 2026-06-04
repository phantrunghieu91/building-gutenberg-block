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
$current_year = date( 'Y' );
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php _e( sprintf( '© %s', 
		!empty( $attributes['showStartingYear'] ) && !empty( $attributes['startingYear'] ) ? "{$attributes['startingYear']} - {$current_year}" : $current_year
	), 'jin-dev' ); ?>
</p>
