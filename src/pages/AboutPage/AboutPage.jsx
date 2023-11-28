import { useEffect } from "react";
import { useState } from "react";
import aboutImg01 from '../../assets/about01.png'
import aboutImg02 from '../../assets/about02.png'
import aboutImg03 from '../../assets/about03.png'

const AboutPage = () => {
    const [abouts, setAbouts] = useState([])
    useEffect(() => {
        fetch('about.json')
            .then(res => res.json())
            .then(data => {
                setAbouts(data)
                console.log(data)
            })
    }, [])
    return (
        <div className="my-32">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div>
                    <p className="text-base font-bold text-[#FC7676]">Who We Are?</p>
                    <h2 className="text-4xl font-extrabold py-2">Litl' Pal shelter</h2>

                    <p className="text-[#4B5563] py-4">
                        Litl’ Pal is <span className="font-semibold text-[#FC7676]">non-profit, all volunteer animal rescue shelter</span> dedicated to protecting and improving the lives of abused, abandoned and neglected homeless animals and placing them in loving, permanent homes.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-16 container mx-auto">
                {
                    abouts.map((about, index) => <div className="border relative px-6 py-8" key={about.index}>
                        <div>
                            <div className="pb-6">
                                <img src={about.image} alt="" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[#4B5563] pb-2">{about.title}</h2>
                                <p className="text-[#4f5865cf]">{about.text}</p>
                                <p className="top-2 right-2 absolute text-[#FC7676]">{about.status}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className="my-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="grid lg:grid-cols-2 lg:gap-12 gap-6">

                    <div>
                        <div>
                            <p className="text-lg font-bold pb-2 text-[#FC7676]">History and Mission of Litl' Pal</p>
                            <h2 className="text-4xl font-extrabold pb-8 leading-tight">
                                We rely on donations
                                and our helpers and volunteers.
                            </h2>

                            <p className="text-[#4f5865cf]">
                                Litl’ Pal is a nonprofit, all volunteer, Fresno-based animal welfare organization involved in the rescue, care and placement of companion animals. Serving the Fresno area since 1984, Litl’ Pal has adhered to a no-kill policy and engaged in community based advocacy on behalf of animals since its inception.<span className="text-[#FC7676] text-sm cursor-pointer">[read more..]</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">

                        <div className="bg-[#1D1D3E] py-4 px-4 text-white border">
                            <img className="lg:w-[30%] py-4" src={aboutImg01} alt="" />
                            <div>
                                <h2 className="font-semibold pb-2">Donation operated</h2>
                                <p className="text-sm text-[#c1c3c6cf]">
                                    Allocating your donations in its entirety to the operation
                                    <span className="text-[#FC7676] cursor-pointer text-[10px]">[read more..]</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1D1D3E] py-4 px-4 text-white border">
                            <img className="lg:w-[30%] py-4" src={aboutImg02} alt="" />
                            <div>
                                <h2 className="font-semibold pb-2">Improving the lives of abused</h2>
                                <p className="text-sm text-[#c1c3c6cf]">
                                    Improving animal welfare has tractable solutions.<span className="text-[#FC7676] cursor-pointer text-[10px]">[read more..]</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1D1D3E] py-4 px-4 text-white border">
                            <img className="lg:w-[30%] py-4" src={aboutImg03} alt="" />
                            <div>
                                <h2 className="font-semibold pb-2">Advocacy on behalf of animals</h2>
                                <p className="text-sm text-[#c1c3c6cf]">
                                Work with local and state legislators to enact meaningful protections.<span className="text-[#FC7676] cursor-pointer text-[10px]">[read more..]</span>

                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutPage;