import { useEffect, useState } from "react";

const Quiz = (set) => {
    const [accounts, setAccounts] = useState(null);
    useEffect(()=>{
        console.log('useEffect is running in quiz component');
        fetch('http://localhost:8000/accounts').then(res=>{
            return res.json();
        }).then((data)=>{
            setAccounts(data);
            console.log(data);
        })
        
    }, [])

    return(
        <section>
            <p>this is the quiz page qui qui quiz</p>
            <p>{set.title}</p>
            {
                accounts && accounts.map((account)=>{
                    return(
                        <div key={account.id}>
                            <p>{account.email}</p>
                            <p>{account.pass}</p>
                        </div>
                    );
                })
            }
        </section>
    );
};
export default Quiz;