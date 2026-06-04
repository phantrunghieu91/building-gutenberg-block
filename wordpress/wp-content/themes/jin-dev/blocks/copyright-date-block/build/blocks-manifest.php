<?php
// This file is generated. Do not modify it manually.
return array(
	'copyright-date-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'jin-dev/copyright-date-block',
		'version' => '0.1.0',
		'title' => 'Copyright Date Block',
		'category' => 'widgets',
		'description' => 'Display Copyright Date text.',
		'example' => array(
			
		),
		'attributes' => array(
			'showStartingYear' => array(
				'type' => 'boolean'
			),
			'startingYear' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => false,
				'text' => true
			),
			'typography' => array(
				'fontSize' => true
			)
		),
		'textdomain' => 'jin-dev',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	)
);
