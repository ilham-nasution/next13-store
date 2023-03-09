import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import ErrorAlert from "@/components/ErrorAlert";

export default function Signup() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setLoginInput({
      ...loginInput,
      email: e.target.value,
    });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setLoginInput({
      ...loginInput,
      password: e.target.value,
    });
  };

  const handleSubmitSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.signUp({
      email: loginInput.email,
      password: loginInput.password,
    });

    if (error) {
      setError(error.message);
    }

    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className="h-screen grid place-items-center">
        <div className="card bg-base-100 shadow-xl">
          <form onSubmit={handleSubmitSignup}>
            <div className="card-body">
              <h2 className="card-title justify-center">Create an Account</h2>
              {error && <ErrorAlert errorMsg={error} />}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={loginInput.email}
                  onChange={handleEmailInput}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  value={loginInput.password}
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="card-actions justify-center my-3">
                <button type="submit" className="btn btn-block btn-primary">
                  sign up
                </button>
              </div>
              <p className="text-center">
                Already have an account?
                <Link href="/login" className="link link-primary ml-1">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
