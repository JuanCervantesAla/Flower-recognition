import { Carousel } from 'flowbite-react';

const Home = () => {
    return (
        <div className="bg-neutralSilver" id="home">
            <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen">
                <Carousel className="w-full mx-auto">
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower.png" alt="" />
                        </div>

                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">Welcome to <span className="text-brandPrimary leading-snug">FloraNet</span></h1>
                            <p className="text-neutralGrey text-base mb-8">Our goal is to be the world's leading flora researcher</p>
                            <a href="/auth" className='btn-primary'>Register</a>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="technology.png" alt="" />
                        </div>

                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">We offer an <span className="text-brandPrimary leading-snug">AI</span> Image <span className="text-brandPrimary leading-snug">Scanner</span></h1>
                            <p className="text-neutralGrey text-base mb-8">Explore our collections or scan your own images</p>
                            <a href="/auth" className='btn-primary'>Start to Scan</a>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="gemini2.png" alt="" />
                        </div>

                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug"><span className="text-brandPrimary leading-snug">Gemini</span> as our main <span className="text-brandPrimary leading-snug">Assistant</span></h1>
                            <p className="text-neutralGrey text-base mb-8">We provide detailed information on flora care treatment</p>
                            <a href="/auth" className='btn-primary'>Start to Research</a>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Home;