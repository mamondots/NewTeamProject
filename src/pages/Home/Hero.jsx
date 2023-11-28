// import heroImg from '../../assets/hero-image.png'
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center px-12 hero text-white bg-gradient-to-r from-[#383A4E] to-[#28282F] min-h-screen">
            <div className='max-w-[900px]'>
                <h3 className='mb-3 text-[18px] ps-1'>Thousands of pals need shelter everyday</h3>
                <h1 className='text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] font-bold md:leading-[80px] lg:leading-[100px]'>Discover Your <span className='gradient-text'>New Companion</span> Today!</h1>
                <div className='mt-5 flex flex-col md:flex-row gap-2 md:gap-5'>
                    <button className='px-6 py-4 text-[15px] hover:bg-[#434760] bg-[#FC7676] transition-color duration-500 rounded-ss-3xl rounded-ee-3xl' onClick={() => navigate("/adoptable-animals")}>Choose New Friend</button>
                    <button className='px-6 py-4 text-[15px] hover:bg-[#FC7676] bg-transparent border-2 hover:border-[#FC7676] border-[#6F6F75] transition-color duration-500 rounded-ss-3xl rounded-ee-3xl' onClick={() => navigate("/about")}>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;