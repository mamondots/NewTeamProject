import React from 'react';
import footerLogo from '../../assets/footer.png'
import './Footer.css'

import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='bg-[#272633] relative'>
            <div className='py-12 lg:px-12 px-8'>
                <div className='flex flex-wrap lg:flex-nowrap w-full lg:gap-12 text-white'>

                    <div className='lg:w-2/4'>
                        <div>
                            <img src={footerLogo} alt="" />
                        </div>
                        <div className='py-8'>
                            <p className='text-[#a8aabf]'>
                            Little Pal is a compassionate community dedicated to animal welfare. We're here to help you find the perfect pet to adopt, offer opportunities to volunteer, and provide support for our furry friends through your generous donations. Together, we're making a brighter future for animals in need.
                            </p>

                            {/* <form className='py-6 flex items-center relative'>
                                <input className='lg:w-[90%] w-full py-3 px-4 border bg-transparent outline-none border-[#3e3e3e] rounded text-lg ' type="text" placeholder='Search..' />
                                <button className='py-4 px-4 bg-[#252C51] text-white font-bold rounded text-xl absolute lg:right-[51px] right-1 hover:bg-[#E66777] duration-300' type='submit'><BiSearch></BiSearch></button>
                            </form> */}

                            <div className='mt-8 footer-link py-12'>
                                {/* <ul className='flex flex-wrap lg:gap-0 gap-2 items-end text-[12px]  text-[#a8aabf]'>
                                    <li><a href="">Home</a></li>
                                    <li><a href="">Pet Listings</a></li>
                                    <li><a href="">About Us</a></li>
                                    <li><a href="">News</a></li>
                                    <li><a href="">Shelter News</a></li>
                                </ul> */}
                            </div>
                        </div>
                    </div>

                    <div className='lg:w-3/4'>

                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 py-6 lg:px-10'>

                            <div className='text-[#a8aabf] quick-link'>
                                <h2 className=''>QUICK LINKS</h2>
                                <ul className='text-sm space-y-3 py-6 mt-6'>
                                    <li><Link to="/adoptable-animals">Adopt a Pet</Link></li>
                                    <li><Link to="/about">About Us</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                    <li><Link to="/team">Our Team</Link></li>
                                    <li><Link to="/wishlist">Wishlist</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </ul>
                            </div>

                            {/* <div className='text-[#a8aabf] quick-link'>
                                <h2 className=''>CATEGORIES</h2>
                                <ul className='text-sm space-y-3 py-6 mt-6'>
                                    <li><Link to="/">Cat</Link></li>
                                    <li><Link to="/">Dog</Link></li>

                                </ul>
                            </div> */}

                            {/* <div className='text-[#a8aabf] quick-link'>
                                <h2 className=''>META</h2>
                                <ul className='text-sm space-y-3 py-6 mt-6'>
                                    <li><a href="">Log in</a></li>
                                    <li><a href="">Entries feed</a></li>
                                    <li><a href="">Comments feed</a></li>
                                    <li><a href="">WordPress.org</a></li>
                                </ul>
                            </div> */}

                        </div>

                    </div>

                </div>
            </div>
            <div>
                <div className='bg-[#2E2C38] py-8 lg:px-12 px-8 absolute bottom-0 w-full border-t border-[#3e3e3e]'>
                    <div className='flex  items-center justify-center flex-wrap lg:gap-0 gap-4'>

                        <div>
                            <p className='text-[#a8aabf] text-sm'>Copyright © 2023 - Lit'l Pal</p>
                        </div>

                        {/* <div className='flex flex-wrap lg:space-x-3 lg:gap-0 gap-4 cursor-pointer'>

                            <div className='py-2 px-4 border rounded-3xl flex items-center space-x-2 text-sm border-[#3e3e3e] text-[#a8aabf] font-medium hover:text-[#fff] hover:bg-[#1DA1F2] duration-300'>
                                <FaTwitter></FaTwitter>
                                <p>TWITTER</p>
                            </div>

                            <div className='py-2 px-4 border rounded-3xl flex items-center space-x-2 text-sm border-[#3e3e3e] text-[#a8aabf] font-medium hover:text-[#fff] hover:bg-[#405DE6] duration-300'>
                            <p><FaInstagram></FaInstagram></p>
                                <p>INSTAGRAM</p>
                            </div>

                            <div className='py-2 px-4 border rounded-3xl flex items-center space-x-2 text-sm border-[#3e3e3e] text-[#a8aabf] font-medium hover:text-[#fff] hover:bg-[red] duration-300'>
                                <p><FaYoutube></FaYoutube></p>
                                <p>YOUTUBE</p>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;