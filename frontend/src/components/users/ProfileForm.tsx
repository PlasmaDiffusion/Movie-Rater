import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { addUser, getUser } from "../../queries/queries";


interface  Props{
    updateUsername: (username:string)=>any;
}

function ProfileForm({updateUsername} : Props){

    const { user, isAuthenticated, isLoading } = useAuth0();


    const [username, setUsername] = useState("");

    const { data } = useQuery(getUser, {variables: {email:user?.email}});

    const [addUserMutation, {data: addResult }] = useMutation(addUser);


    if (data)
    {
        console.log(data);
    }

    function onSubmit(e:React.FormEvent<HTMLInputElement>)
    {
        e.preventDefault();
        console.log("new username will be: ", username);
        if (username !== "") updateUsername(username);
    }

    if (!data || data.user=== null)return (
    <div className="reviewForm">
        
        <h1>Enter A Username</h1>
        <form method="POST" onSubmit={(e:any)=>onSubmit(e)}>
            
            <p style={{textAlign:"center"}}>Please enter a <strong>username</strong> that <i>people will see in your reviews.</i></p>
            <p>Ignore this if you'd prefer to be anonymous.</p>


           <label >Username </label><br></br>
        
           <input name="username" type="text" placeholder="Your name here..." onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}></input>
        
           <br></br><br></br>
            <input type="submit" value={"Submit"} />
        </form>

    </div>

    )
    return <></>;
}

export default ProfileForm;