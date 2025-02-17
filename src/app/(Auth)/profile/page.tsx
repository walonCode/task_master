import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Profile from "@/components/Profile";

type User = {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  picture?: string;
  properties?:{
    job_title:string
  }
};

export default async function ProfilePage() {
  const { getUser,} = getKindeServerSession();
  const user = (await getUser()) as User | null;
  

  return <Profile user={user}/>
}
