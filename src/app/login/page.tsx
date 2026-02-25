'use client'

import { login, signInWithGoogle } from '@/app/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react'

export default function LoginPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>

            <Card className="w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/5 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="space-y-4 flex flex-col items-center pt-8 pb-4">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                        <Image src="/brain.png" alt="Logiq Logo" width={80} height={80} className="relative drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    </div>
                    <div className="text-center">
                        <CardTitle className="text-4xl font-headline tracking-tighter text-white italic uppercase">Welcome Back</CardTitle>
                        <CardDescription className="text-slate-400 mt-1">Ready to dominate the leaderboard?</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="px-8 space-y-6">
                    <div className="space-y-3">
                        <Button
                            onClick={() => signInWithGoogle()}
                            variant="outline"
                            className="w-full py-7 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white gap-3 transition-all duration-300"
                        >
                            <Chrome className="w-5 h-5 text-primary" />
                            Continue with Google
                        </Button>
                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-white/10"></div>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">or use email</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>
                    </div>

                    <form action={login} className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-xs p-4 rounded-2xl border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    className="pl-12 py-6 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Password</Label>
                                <Link href="#" className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-primary/80">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="pl-12 py-6 rounded-2xl bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full py-7 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl mt-4 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all group">
                            Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pb-8 pt-0">
                    <p className="text-sm text-slate-500 font-medium">
                        New to Logiq?{' '}
                        <Link href="/signup" className="text-primary font-bold hover:text-primary/80 transition-colors">
                            Create Account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

