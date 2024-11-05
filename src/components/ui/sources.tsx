const Sources = () => {
    const sources = [
        {id: 1, title: "Back-Front End", description: "Interface, communication, user, design and performance.", image: "back-frontend.png"},
        {id: 2, title: "Auth System", description: "Signup, login, security, Firebase and users.", image: "auth.png"},
        {id: 3, title: "AI Integration", description: "Recognition, image, prediction, analysis and accuracy.", image: "ai.png"},
    ]
    return (
        <div className="md:px-14 px-4 py-16 max-w-screen-2x1 mx-auto" id="sources">
            <div className="text-center my-8">
                <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">Our Sources</h2>
                <p className="text-netralGrey">We have used some frameworks and APIs for development</p>

                <div className="my-12 flex flex-wrap justify-between items-center gap-8">
                    <a href="https://nodejs.org/"><img src="node-js.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://vite.dev/"><img src="vite.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://react.dev/"><img src="react.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://www.typescriptlang.org/"><img src="typescript.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://www.tensorflow.org/"><img src="tensorflow.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://tailwindcss.com/"><img src="tailwind.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://firebase.google.com/"><img src="firebase.png" alt="" className="cursor-pointer" /></a>
                    <a href="https://gemini.google.com/"><img src="gemini.png" alt="" className="cursor-pointer" /></a>
                </div>

                <div className="mt-20 md:w-1/2 mx-auto text-center">
                    <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">QA Certifications</h2>
                    <p className="text-netralGrey">We make sure that high quality is always our priority</p>
                </div>

                <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
                    {
                        sources.map(source => <div key={source.id} className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-full">
                            <div>
                                <div className="bg-[#d1ecee] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl"><img src={source.image} alt="" className="-ml-5" /></div>
                                <h4 className='text-2xl font-bold text-neutralDGrey mb-2 px-2'>{source.title}</h4>
                                <p className="text-sm text-neutralGrey">{source.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Sources;