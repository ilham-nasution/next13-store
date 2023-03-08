import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Login() {
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

  const handleEmailInput = (e) => {
    setLoginInput({
      ...loginInput,
      email: e.target.value,
    });
  };

  const handlePasswordInput = (e) => {
    setLoginInput({
      ...loginInput,
      password: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: loginInput.email,
      password: loginInput.password,
    });

    console.log(data);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="h-screen grid place-items-center">
          <div className="card bg-base-100 shadow-xl">
            <form onSubmit={handleSubmitLogin}>
              <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
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
                    sign in
                  </button>
                </div>
                <p className="text-center">Don{"'"}t have an account?</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
