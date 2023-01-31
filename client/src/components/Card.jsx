import FileSaver from 'file-saver';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card transition-all cursor-pointer'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />

      <div className='group-hover:flex flex-col hidden max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-2 rounded-md transition-all'>
        <p className='text-white text-md overflow-y-auto'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className=' flex items-center justify-center bg-green-900 w-10 h-10 rounded-full text-xs font-bold text-white'>
              {name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>

          <button
            onClick={() => downloadImage(_id, photo)}
            className='outline-none bg-transparent border-none text-white'
          >
            <img
              src={download}
              alt='download'
              className='w-10 h-10 object-contain invert'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
