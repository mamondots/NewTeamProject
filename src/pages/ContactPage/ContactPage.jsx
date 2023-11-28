import Lottie from 'lottie-react';
import animation from '../../../public/Animation - 1699362983610.json'

const ContactPage = () => {
    return (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div>
                 <p className='text-[#4B5563] font-medium'>Contact us</p>
                 <h2 className='text-xl font-semibold py-1'>Share Your Thought <span className='text-[#FC7676]'>With Us!</span></h2>
            </div>

            <div className='grid lg:grid-cols-2 gap-8 mt-10'>

                 <div className='border'>
                        <Lottie animationData = {animation}></Lottie>
                 </div>

                 <div className=''>
                    <div>
                          <h2 className='text-xl font-semibold'>Let's Send Your <span className='text-[#FC7676]'>Message</span></h2>
                          <p className='py-2 pb-4 text-[#4B5563]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nobis autem reprehenderit expedita magni sapiente dolores, nemo dolorem?</p>
                    </div>
                        <form className='w-full space-y-4 py-4'>
                              <input className='py-2 px-4 w-full border outline-none border-[#fc767636]' type="text" placeholder='Your Name' />
                              <input className='py-2 px-4 w-full border border-[#fc767636] outline-none' type="email" placeholder='Your Email' />
                              <input className='py-2 px-4 w-full border border-[#fc767636] outline-none' type="text" placeholder='Your Address' />
                              <textarea className='py-2 px-4 w-full border outline-none border-[#fc767636]' name="" id="" cols="30" rows="10" placeholder='Your Message'></textarea>
                              <input className='bg-[#FC7676] py-4 px-8 text-white text-sm hover:bg-[#4B5563] duration-300 cursor-pointer' type="submit" value="SEND MESSAGE" />
                        </form>
                        
                 </div>

            </div>
        </div>
    );
};

export default ContactPage;