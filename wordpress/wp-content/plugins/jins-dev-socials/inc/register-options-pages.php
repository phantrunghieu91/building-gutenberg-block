<?php
/**
 * @author Hieu "Jin" Phan Trung
 * * Handling register custom options pages
 */
class JinsRegisteringOptionsPages {
  protected array $options_pages    = [];
  protected array $sub_pages        = [];
  protected array $options_settings = [];
  public function __construct() {
    $this->set_options_pages();
    $this->set_options_settings();
    add_action( 'admin_menu', [ $this, 'register_options_pages' ] );
    add_action( 'init', [ $this, 'register_option_settings'] );
    add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_options_page_asset'] );
  }
  protected function set_options_pages() {
    $this->options_pages = [
      [
        'page_title' => __( "Jin's Dev Theme General Settings", 'jins-dev' ),
        'menu_title' => __( 'Jin\'s Theme Settings','jins-dev' ),
        'capability' => 'manage_options',
        'menu_slug'  => 'jins-dev-general-settings',
        'callback'   => [$this, 'render_options_page_template'],
        'icon_url'   => 'dashicons-chart-pie',
        'position'   => 10
      ]
    ];
  }
  protected function set_options_settings() {
    $this->options_settings = [
      [
        'option_group' => 'jins_dev_general_settings',
        'option_name'  => 'jins_dev_socials',
        'type'         => 'array',
        'label'        => 'Socials',
        'show_in_rest' => [
          'schema' => [
            'type'  => 'array',
            'items' => [
              'type'       => 'object',
              'properties' => [
                'icon_id'  => [ 'type' => 'integer' ],
                'icon_url' => ['type' => 'string'],
                'label'    => [ 'type' => 'string' ],
                'url'      => [ 'type' => 'string' ],
              ]
            ]
          ]
        ],
        'sanitize_callback' => null,
      ]
    ];
  }
  public function register_options_pages() : void {
    if( empty( $this->options_pages ) ) {
      return;
    }
    foreach( $this->options_pages as $options_page ) {
      add_menu_page(
        $options_page['page_title'],
        $options_page['menu_title'],
        $options_page['capability'],
        $options_page['menu_slug'],
        $options_page['callback'],
        $options_page['icon_url'],
        $options_page['position'],
      );
    }
  }
  public function register_option_settings() {
    if( empty( $this->options_settings ) ) {
      return;
    }
    foreach( $this->options_settings as $setting ) {
      register_setting(
        $setting['option_group'],
        $setting['option_name'],
        [
          'type'              => $setting['type']              ?? 'string',
          'label'             => $setting['label']             ?? '',
          'sanitize_callback' => $setting['sanitize_callback'] ?? null,
          'show_in_rest'      => $setting['show_in_rest']      ?? false,
        ]
      );
    }
  }
  public function render_options_page_template() {
    ?>
    <div class="wrap">
      <h1><?= get_admin_page_title() ?></h1>
      <div id="jins-dev-root"></div>
    </div>
    <?php
  }
  public function enqueue_options_page_asset( $hook ) {
    foreach( $this->options_pages as $page ) {
      if( "toplevel_page_{$page['menu_slug']}" !== $hook ) {
        continue;
      }
      $asset_file   = include_once get_template_directory() . "/inc/dashboard/{$page['menu_slug']}.asset.php";
      $js_file_path = get_template_directory_uri() . "/inc/dashboard/{$page['menu_slug']}.js";

      wp_enqueue_media();
      
      wp_enqueue_script(
        "{$page['menu_slug']}-page-js",
        $js_file_path,
        array_merge( $asset_file['dependencies'], [ 'media-upload' ] ),
        $asset_file['version'],
        true
      );
    }
  }
}