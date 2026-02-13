"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Content */}
        <div className="bg-white rounded-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-600 mb-8">Sign up or log in to continue</p>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Log In Button */}
          <Button
            className="w-full mb-3 bg-pink-600 hover:bg-pink-700 text-white h-12 text-base font-semibold"
            onClick={() => {}}
          >
            Log in
          </Button>

          {/* Sign Up Button */}
          <Button
            variant="outline"
            className="w-full mb-6 h-12 text-base font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
            onClick={() => {}}
          >
            Sign up
          </Button>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
