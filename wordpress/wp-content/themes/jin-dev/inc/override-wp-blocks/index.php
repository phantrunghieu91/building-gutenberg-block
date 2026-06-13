<?php
$dirIterator = new RecursiveDirectoryIterator( __DIR__, RecursiveDirectoryIterator::SKIP_DOTS );
$iterator    = new RecursiveIteratorIterator( $dirIterator );
foreach( $iterator as $item ) {
  if( (
    $item->getPath() === __DIR__ && $item->getFileName() === 'index.php' )
    || $item->getFileName() === 'style.css'
  ) {
    continue;
  }
  require_once $item->getPathname();
}