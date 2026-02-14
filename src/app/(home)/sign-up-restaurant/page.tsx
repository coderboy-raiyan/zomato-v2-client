"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { z } from "zod";

const emailSchema = z.email("Invalid email address");
const contactNoSchema = z
  .string()
  .regex(
    /^\+8801[3-9]\d{8}$/,
    "Valid Bangladesh mobile number (+8801XXXXXXXXX)",
  )
  .length(14, "Must be at least 14 characters");
const shopNameSchema = z.string().min(1, "Invalid shop name");
const addressSchema = z.string().min(1, "Invalid address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export default function SignUpRestaurantPage() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<(HTMLDivElement | null)[]>([]);

  const form = useForm({
    defaultValues: {
      email: "",
      shopName: "",
      address: "",
      contactNo: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
    },
  });

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Animate each food item with random movements
    foodRef.current.forEach((item, index) => {
      if (!item) return;

      const duration = 15 + Math.random() * 10;
      const delay = index * 0.5;

      // Floating movement
      gsap.to(item, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        rotation: "random(-180, 180)",
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
      });

      // Gentle pulse
      gsap.to(item, {
        scale: "random(0.9, 1.1)",
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
      });
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden p-4">
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-linear-to-br from-orange-50 via-red-50 to-yellow-50"
      >
        {/* Floating Food Icons */}
        <div
          ref={(el) => {
            foodRef.current[0] = el;
          }}
          className="absolute top-1/4 left-1/4 text-6xl opacity-20 select-none pointer-events-none"
        >
          🍕
        </div>
        <div
          ref={(el) => {
            foodRef.current[1] = el;
          }}
          className="absolute top-1/3 right-1/4 text-7xl opacity-20 select-none pointer-events-none"
        >
          🍔
        </div>
        <div
          ref={(el) => {
            foodRef.current[2] = el;
          }}
          className="absolute bottom-1/4 left-1/3 text-6xl opacity-20 select-none pointer-events-none"
        >
          🥗
        </div>
        <div
          ref={(el) => {
            foodRef.current[3] = el;
          }}
          className="absolute bottom-1/3 right-1/3 text-5xl opacity-20 select-none pointer-events-none"
        >
          🥤
        </div>
        <div
          ref={(el) => {
            foodRef.current[4] = el;
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10 select-none pointer-events-none"
        >
          🥡
        </div>
        <div
          ref={(el) => {
            foodRef.current[5] = el;
          }}
          className="absolute top-20 right-20 text-5xl opacity-20 select-none pointer-events-none"
        >
          🍟
        </div>
        <div
          ref={(el) => {
            foodRef.current[6] = el;
          }}
          className="absolute bottom-20 left-20 text-6xl opacity-20 select-none pointer-events-none"
        >
          🍦
        </div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        {/* Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-600 mb-8">Sign up or log in to continue</p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Field */}
              <form.Field
                name="email"
                validators={{
                  onChange: emailSchema,
                }}
              >
                {(field) => (
                  <div className="mb-4">
                    <Label htmlFor={field.name} className="block mb-2">
                      Email
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Shop name Field */}
              <form.Field
                name="shopName"
                validators={{
                  onChange: shopNameSchema,
                }}
              >
                {(field) => (
                  <div className="mb-4">
                    <Label htmlFor={field.name} className="block mb-2">
                      Shop name
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Zian's BBQ"
                      className="h-12"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Contact Field */}
              <form.Field
                name="contactNo"
                validators={{
                  onChange: contactNoSchema,
                }}
              >
                {(field) => (
                  <div className="mb-4">
                    <Label htmlFor={field.name} className="block mb-2">
                      Contact Number
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+88019032..."
                      className="h-12"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Address Field */}
              <form.Field
                name="address"
                validators={{
                  onChange: addressSchema,
                }}
              >
                {(field) => (
                  <div className="mb-4">
                    <Label htmlFor={field.name} className="block mb-2">
                      Address
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Nila market, H-19"
                      className="h-12"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: passwordSchema,
              }}
            >
              {(field) => (
                <div className="mb-6">
                  <Label htmlFor={field.name} className="block mb-2">
                    Password
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="h-12"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors
                        .map((e) => e?.message)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white h-12 text-base font-semibold"
            >
              Sign up
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              {" "}
              Sign in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
