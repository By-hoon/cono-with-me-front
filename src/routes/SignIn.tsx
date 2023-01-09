import { SignInForm } from "../components/SignForm";

interface SignInProps {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ setIsSignIn }: SignInProps) => {
  return <SignInForm setIsSignIn={setIsSignIn} />;
};

export default SignIn;
