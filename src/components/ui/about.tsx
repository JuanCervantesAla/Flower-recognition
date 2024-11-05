import React from "react";

const About = () => {
    return (
        <div>
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8" id="about">
                <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <img src="about.png" alt="" />
                    </div>
                    <div className="md:w-3/5 mx-auto">
                        <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5">About Us</h2>
                        <p className="md:w-3/4 text-justify text-sm text-neutralGrey mb-8">This website provides a unique experience for botany and AI enthusiasts. Through a secure authentication system, new and returning users can access its main feature: an advanced flower recognition system. The platform allows users to upload images of flowers, which are then analyzed by a specialized AI model to identify their type and characteristics with precision. Ideal for both kind of users, this tool offers an intuitive and educational way to explore the fascinating flora.</p>
                        <button className="btn-primary">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;