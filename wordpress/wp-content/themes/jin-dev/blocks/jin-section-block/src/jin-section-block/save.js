import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({ className: 'jin-section' });
  const innerBlocksProps = useInnerBlocksProps.save();

  return (
    <section { ...blockProps }>
      <div className='jin-section__inner' { ...innerBlocksProps } />
    </section>
  );
}