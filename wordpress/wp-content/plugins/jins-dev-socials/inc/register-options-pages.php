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
        'page_title' => __( "Jin's Dev Socials Settings", 'jins-dev' ),
        'menu_title' => __( 'Jin\'s Socials','jins-dev' ),
        'capability' => 'manage_options',
        'menu_slug'  => 'jins-dev-socials-general-settings',
        'callback'   => [$this, 'render_options_page_template'],
        'icon_url'   => 'dashicons-chart-pie',
        'position'   => 25
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
                'icon_url' => [ 'type' => 'string' ],
                'label'    => [ 'type' => 'string' ],
                'url'      => [ 'type' => 'string' ],
              ]
            ]
          ]
        ],
      ],
      [
        'option_group' => 'jins_dev_fe_display_settings',
        'option_name'  => 'jins_dev_socials_fe_display_settings',
        'type'         => 'object',
        'label'        => 'Display on F.E Settings',
        'show_in_rest' => [
          'schema' => [
            'type'       => 'object',
            'properties' => [
              'will_display_on_web'          => [ 'type' => 'boolean' ],
              'horizontal_position'          => [ 'type' => 'string' ],
              'vertical_position'            => [ 'type' => 'string' ],
              'icon_size'                    => [ 'type' => 'number' ],
              'spacing_with_horizontal_edge' => ['type' => 'number'],
              'spacing_with_vertical_edge'   => ['type' => 'number'],
              'space_between_items'          => ['type' => 'number'],
              'border_corner_style'          => ['type' => 'string'],
            ]
          ]
        ],
      ],
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
      $asset_file    = include_once PLUGIN_JINS_DEV_SOCIALS_PATH . "/build/{$page['menu_slug']}.asset.php";
      $js_file_path  = PLUGIN_JINS_DEV_SOCIALS_URI . "/build/{$page['menu_slug']}.js";
      $css_file_path = PLUGIN_JINS_DEV_SOCIALS_URI . "/build/{$page['menu_slug']}.css";

      wp_enqueue_media();
      
      wp_enqueue_script(
        "{$page['menu_slug']}-page-js",
        $js_file_path,
        array_merge( $asset_file['dependencies'], [ 'media-upload' ] ),
        $asset_file['version'],
        true
      );

      wp_enqueue_style(
        "{$page['menu_slug']}-page-js",
        $css_file_path,
        [],
        $asset_file['version'],
        'all'
      );
    }
  }
}