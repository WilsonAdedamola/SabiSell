import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Heading, Label } from '../../components/ui/Typography';
import { EyeIcon } from '../../components/shared/Icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Mockup screen content for mobile */}
      <div className="space-y-3">
        <Heading level={2} className="text-3xl font-extrabold tracking-tighter text-emerald-900 md:text-3xl md:font-semibold md:tracking-normal md:text-gray-900">Welcome Back!</Heading>
        <Label>Login to your account</Label>
      </div>
      
      <form className="space-y-5">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="Enter your email" 
        />
        <div className="relative">
          <Input 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          placeholder="Enter your password" 
          />
          <EyeIcon 
          isVisible={showPassword} 
          toggle={() => setShowPassword(!showPassword)} 
          />
          <Link to="/auth/forgot-password" className="absolute right-0 top-0 text-xs font-semibold text-emerald-600 hover:text-emerald-700">Forgot Password?</Link>
        </div>
        <Button className="w-full" size="lg">Login</Button>
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
      <Button variant="outline" className="w-full gap-3 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
        <span className="text-lg">G</span> Continue with Google
      </Button>
      
      <p className="text-center text-sm text-gray-500 pt-3">
        Don't have an account? <Link to="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-700">Sign Up</Link>
      </p>
    </div>
  )
}

export default Login
