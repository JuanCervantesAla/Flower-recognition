import { Carousel } from 'flowbite-react';

const Explorer = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 via-white-300 to-green-200 animate-gradient" id="explorer">
            <div className="inset-0 bg-gradient-to-r from-blue-200 via-white-300 to-green-200 opacity-50 blur-lg transform scale-110" />
            <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen">
                <Carousel className="w-full mx-auto">
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower1.jpg" alt="" className="square" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">Tulip</h1>
                            <p className="text-2xl text-neutralDGrey mb-8">Thrives in full sun to partial shade and well-drained soil. Water deeply, but infrequently, allowing the soil to dry slightly between waterings. These bulbs reach heights of 12-18 inches.</p>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower2.jpg" alt="" className="square" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">Gerbera</h1>
                            <p className="text-2xl text-neutralDGrey mb-8">Thrives in bright, indirect light and well-draining soil. Water when the top inch of soil is dry, allowing excess to drain. They grow 1-2 feet tall and wide, needing repotting every 1-2 years.</p>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower3.jpg" alt="" className="square" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">Daisy</h1>
                            <p className="text-2xl text-neutralDGrey mb-8">Thrives in full sun and well-drained soil. Water regularly, especially during dry spells. This perennial grows 1-2 feet tall and wide, forming a clump of foliage with daisy-like flowers.</p>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower4.jpg" alt="" className="square" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">Rose</h1>
                            <p className="text-2xl text-neutralDGrey mb-8">Thrives in full sun to partial shade. Water deeply, allowing soil to dry slightly between waterings. It can grow up to 10 feet tall and wide.</p>
                        </div>
                    </div>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                        <div>
                            <img src="flower5.jpg" alt="" className="square" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">Sunflower</h1>
                            <p className="text-2xl text-neutralDGrey mb-8">Thrives in full sun and moist, well-drained soil. Water regularly, especially during dry spells. This tall sunflower can reach heights of 8-12 feet!</p>
                        </div>
                    </div>
                </Carousel>
            </div>
            <style>{`
                .animate-gradient {
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;
                }

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default Explorer;