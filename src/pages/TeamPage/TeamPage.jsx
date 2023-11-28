import './TeamPage.css'
import member from '../../assets/member01.jpg'
import member2 from '../../assets/member02.jpg'
import member3 from '../../assets/member03.jpg'
import member4 from '../../assets/member04.jpg'
import member5 from '../../assets/member05.jpg'
import member6 from '../../assets/member06.jpg'
import { FaFacebookF,FaInstagram,FaTwitter,FaLinkedinIn } from 'react-icons/fa';

const TeamPage = () => {
    return (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
           <div>
             <p className='font-bold py-2 '>OUR <span className='text-[#FC7676]'>TEAM</span></p>
             <h2 className="text-xl font-bold text-[#4B5563]">We are try to <span className="text-[#FC7676]">Best services</span> For your happiness</h2>
           </div>

           <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 my-12'>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member} alt="" />
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Autaher Ahmed Shakil</h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member2} alt="" />
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Umme Salma Papon </h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member3} alt="" />
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Margub Murshed</h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member4} alt="" />
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Sydur Rahman</h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member5} alt="" />
                         <p className='top-2 right-2 absolute text-[#FC7676] text-sm'>Unactive</p>
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Sohel Rana</h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>

                <div className='member-full-box'>
                    <div className='relative overflow-hidden'>
                         <img className='overflow-hidden w-full'  src={member6} alt="" />
                         <p className='top-2 right-2 absolute text-[#FC7676] text-sm'>Drop-Out</p>
                         <div className='social-icon-box absolute bottom-0 '>
                               <div className='z-10 flex items-center justify-center pt-6 space-x-2 text-white text-xl'>
                                  <p><FaFacebookF></FaFacebookF></p>
                                  <p><FaInstagram></FaInstagram></p>
                                  <p><FaTwitter></FaTwitter></p>
                                  <p><FaLinkedinIn ></FaLinkedinIn></p>
                               </div>
                         </div>
                    </div>
                    <div className='member-info pt-2 px-2'>
                          <h2 className='text-xl font-bold'>Maruf Hosen</h2>
                          <p className='text-[#4B5563]'>Junior web developer</p>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default TeamPage;