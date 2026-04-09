import { Link } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Heading, Label } from '../../components/ui/Typography'

const ForgotPassword = () => {
   return (
    <div className="space-y-10 text-center">
      <div className="space-y-3">
        <Heading level={2} className="text-3xl font-extrabold tracking-tighter text-emerald-900">Reset Password</Heading>
        <Label>Enter your email and we'll send you a link to reset your password.</Label>
      </div>

      <div className="relative p-10 py-12 flex justify-center bg-gray-50 rounded-4xl border border-gray-100">
          {/* Placeholder for envelope graphic */}
          <span className="text-6xl">✉️</span>
      </div>
      
      <form className="space-y-5 text-left">
        <Input label="Email Address" type="email" placeholder="e.g. marydaniel@gmail.com" />
        <Button className="w-full" size="lg">Send Reset Link</Button>
      </form>
      
      <p className="text-center text-sm text-gray-500 pt-3">
        <Link to="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-700">Back to Login</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
