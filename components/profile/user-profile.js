
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const {data : session, status} = useSession();

  // const [ isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState(false);
  
  // useEffect(() => {
  //   getSession().then((session) =>{
  //     if(!session){
  //       window.location.href = '/auth';
  //     }
  //     else{
  //       setIsLoading(false);
  //     }
  //   })
  // }, []);
  // if( status === "loading" && isLoading){
  //   return <p className={classes.profile}>Loading...</p>
  // }
  // Redirect away if NOT auth
 
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
