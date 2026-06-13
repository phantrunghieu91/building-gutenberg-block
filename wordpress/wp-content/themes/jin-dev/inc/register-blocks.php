<?php
/**
 * @author Hieu "Jin" Phan Trung
 * * Template: Class handle register custom
 */
class RegisterBlocks {
  protected array $block_list;
  public function __construct() {
    $this->set_block_list();
    add_action( 'init', [ $this, 'register_blocks'] );
  }
  protected function set_block_list() {
    $this->block_list = ['jins-socials'];
  }
  public function add_block_to_list( $block_name ) {
    if( empty( $block_name ) ) {
      return;
    }
    $this->block_list[] = $block_name;
  }
  public function register_blocks() {
    if( empty( $this->block_list ) ) {
      return;
    }
    foreach( $this->block_list as $block_name ) {
      $file_path = get_template_directory() . "/blocks/{$block_name}";
      wp_register_block_types_from_metadata_collection( "$file_path/build", "$file_path/build/blocks-manifest.php" );
    }
  }
}