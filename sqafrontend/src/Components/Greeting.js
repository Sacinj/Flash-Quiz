import '../styles/Greetings.css';

const Greeting = () => {
    return(
        <div className="Parent_container">
            {/* <p>Greeting!!! Study Everyday</p> */}
            <section className="tutorial_bubbles">
                <article>
                    <p>click here to start a quiz</p>
                </article>

                <article>
                    <p>click here to add a new flash card set or questions to an existing set</p>
                </article>

                <article>
                    <p>click here to go to the profile page</p>
                </article>
                
            </section>
            <section className="svg">
                <p>Greeting!!! Study Everyday</p>
            </section>
            
            
        </div>
    );
};

export default Greeting;