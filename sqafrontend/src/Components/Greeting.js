import '../styles/Greetings.css';

const Greeting = () => {
    return(
        <div className="greeting">
            <section className="tutorial">
                <article className="tutorial__bubble cardset-bubble">
                    <p>Start Flash Card Quiz or Click the icon to add new cards</p>
                </article>

                <article className="tutorial__bubble create-bubble">
                    <p>Create New Flash Card Set</p>
                </article>

                <article className="tutorial__bubble tutorial-bubble">
                    <p>You are here</p>
                </article>
                
                <article className="tutorial__bubble account-bubble">
                    <p>Account Settings</p>
                </article>
                
            </section>
            <section className="welcome">
                <p>Welcome</p>
            </section>
            
            
        </div>
    );
};

export default Greeting;