import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }
    return {
      props: { session },
    };
  } catch (error) {
    return {
      props: { error: "failed to get session" },
    };
  }
}

export default ProfilePage;
