import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type User = {
    id: string;
    given_name: string;
    family_name: string;
    email: string;
    picture?: string; // Profile image (optional)
};

export default async function NavbarWrapper(){
    const {isAuthenticated,getUser} = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    const user = (await getUser()) as User | null

    return(
        <>
            <Navbar isAuthenticated={isUserAuthenticated}/>
            <Sidebar isAuthenticated={isUserAuthenticated} user={user}/>
        </>    
    )     
}