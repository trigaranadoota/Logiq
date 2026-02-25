'use client'

import { signup } from '@/app/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="space-y-4 flex flex-col items-center">
                    <Image src="/brain.png" alt="Logiq Logo" width={60} height={60} className="mb-2" />
                    <div className="text-center">
                        <CardTitle className="text-2xl font-headline tracking-tight">Create Account</CardTitle>
                        <CardDescription>Join the Logiq arena and track your progress</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form action={signup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="johndoe" required className="rounded-xl border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="abc@gmail.com" required className="rounded-xl border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required className="rounded-xl border-slate-200" />
                        </div>
                        <Button type="submit" className="w-full py-6 rounded-xl bg-primary text-primary-foreground font-headline text-lg mt-4 shadow-lg hover:shadow-xl transition-all">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pt-2">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
