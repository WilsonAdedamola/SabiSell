import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Heading, Label } from "../../components/ui/Typography";
import { EyeIcon } from "../../components/shared/Icons";

const Register = () => {
  const [role, setRole] = useState("vendor"); // 'vendor' or 'customer'
  const [showPassword, setShowPassword] = useState(false);

  const RoleToggle = () => (
    <div className="grid grid-cols-2 bg-gray-100 rounded-full p-1 border border-gray-200">
      {["vendor", "customer"].map((item) => (
        <button
          key={item}
          onClick={() => setRole(item)}
          className={`capitalize py-2 px-6 font-semibold rounded-full transition-all ${role === item ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-emerald-600"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Mockup screen content for mobile */}
      <div className="space-y-3">
        <Heading
          level={2}
          className="text-3xl font-extrabold tracking-tighter text-emerald-900 md:text-3xl md:font-semibold md:tracking-normal md:text-gray-900"
        >
          Create Account
        </Heading>
        <Label>Join SabiSell and start your online store.</Label>
      </div>

      <RoleToggle />

      <form className="space-y-5">
        <Input label="Full Name" placeholder="e.g. Mary Daniel" />
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. marydaniel@gmail.com"
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
          />
          <EyeIcon
            isVisible={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />
        </div>
        <Button className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      {/* Social login option */}
      <div className="relative pt-3 pb-3">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">or</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full gap-3 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
      >
        <span className="text-lg">G</span> Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-500 pt-3">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
