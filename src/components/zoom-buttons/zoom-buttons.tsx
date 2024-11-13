import { Button, Tooltip } from '@nextui-org/react';
import { useMap } from 'react-leaflet';
import { FaMinus, FaPlus } from 'react-icons/fa6';

export const ZoomButtons = () => {
  const map = useMap();
  return (
    <div className='flex items-center flex-col gap-[10px] absolute top-[100px] right-0 z-[10000]'>
      <Tooltip
        showArrow
        className='bg-black text-white'
        placement='left'
        content={'Zoom In'}
      >
        <Button
          variant='shadow'
          className='bg-black text-white'
          onClick={() => map.zoomIn()}
        >
          <FaPlus />
        </Button>
      </Tooltip>
      <Tooltip
        showArrow
        className='bg-black text-white'
        placement='left'
        content={'Zoom Out'}
      >
        <Button
          variant='shadow'
          className='bg-black text-white'
          onClick={() => map.zoomOut()}
        >
          <FaMinus />
        </Button>
      </Tooltip>
    </div>
  );
};
