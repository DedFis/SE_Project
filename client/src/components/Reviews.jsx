import Ratings from "./Ratings";
import RatingTemp from "./RatingTemp";

const Reviews = () => {
    return ( 
        <div className="mt-8">
            <div className="flex gap-10 md:flex-col">
                <div className='flex flex-col gap-2 justify-start items-start py-4'>
                    <div>
                        <span className='text-6xl font-semibold'>4.5</span>
                        <span className='text-3xl font-semibold text-slate-600'>/5</span>
                    </div>
                <div className='flex text-4xl'>
                    <Ratings ratings={4.5} />
                </div>
                <p className='text-sm text-slate-600'>Reviews</p>
            </div>
            <div className='flex gap-2 flex-col py-4'>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={4} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingTemp rating={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#EDBB0E]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>
          </div>
            </div>
        </div>
    );
}
 
export default Reviews;