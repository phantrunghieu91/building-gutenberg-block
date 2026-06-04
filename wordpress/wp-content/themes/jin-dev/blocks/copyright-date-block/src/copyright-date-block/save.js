import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
  const { showStartingYear, startingYear } = attributes;
  
  return (
    <p { ...useBlockProps.save( ) } >
      { showStartingYear && startingYear ? `© ${startingYear} - ${currentYear}` : `© ${currentYear}` }
    </p>
  );
}