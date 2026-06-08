<?php

declare( strict_types=1 );

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = ( new Finder() )
  ->in( __DIR__ );

return ( new Config() )
  ->setRiskyAllowed( false )
  ->setRules( [
    // 1. Method Chaining Fix 💡
    'method_chaining_indentation' => true, // 👈 FORCES -> CHAINS TO RESPECT YOUR 2-SPACE INDENT
    'indentation_type'            => true, // Forces spaces instead of tabs
    'statement_indentation'       => true, // 👈 FORCES CLOSURES & FUNCTIONS TO RESPECT YOUR 2-SPACE LEVEL

    // 2. Array alignments
    'array_indentation'      => true,
    'binary_operator_spaces' => [
      'default' => 'align_single_space_minimal', // 👈 This forces ALL '=>' arrows (even nested ones) to align neatly!
      // 'operators' => [
      //   '=>' => 'align_single_space_minimal',
      // ],
    ],

    // 3. Allow padding spaces inside single line brackets [ 'name' => 'jin' ]
    'array_syntax'                    => ['syntax' => 'short'],
    'trim_array_spaces'               => false,
    'whitespace_after_comma_in_array' => ['ensure_single_space' => true],
        
    // 4. Spacing inside IF statements: if ( false === empty($test) )
    'spaces_inside_parentheses' => [
      'space' => 'single',
    ],
        
    // 5. Braces layout
    'braces_position' => [
      'control_structures_opening_brace' => 'same_line',
      'functions_opening_brace'          => 'same_line', // 👈 FORCES FUNCTION { TO STAY ON THE SAME LINE
      'classes_opening_brace'            => 'same_line'
    ],

    // 6. Cleanup
    'no_trailing_whitespace' => true,
  ] )
  ->setIndent( "  " ) // Force strict 2-space indentation globally
  ->setFinder( $finder );