'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react'
import { authMock } from '@/lib/auth-mock'

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate a slight network delay
        setTimeout(() => {
            authMock.signIn()
            router.push('/arena')
        }, 1000)
    }

    const handleGoogleLogin = () => {
        setLoading(true)
        setTimeout(() => {
            authMock.signIn()
            router.push('/arena')
        }, 800)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <Card className="w-full max-w-md shadow-2xl border-border bg-card/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative z-10">
                <CardHeader className="space-y-4 flex flex-col items-center pt-8 pb-4">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                        <Image src="/brain.png" alt="Logiq Logo" width={80} height={80} className="relative drop-shadow-[0_0_15px_rgba(var(--primary),0.2)]" />
                    </div>
                    <div className="text-center">
                        <CardTitle className="text-4xl font-headline tracking-tighter text-foreground italic uppercase">Welcome Back</CardTitle>
                        <CardDescription className="text-muted-foreground mt-1">Ready to dominate the leaderboard?</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="px-8 space-y-6">
                    <div className="space-y-3">
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            variant="outline"
                            className="w-full py-7 rounded-2xl border-border bg-background hover:bg-muted text-foreground gap-3 transition-all duration-300"
                        >
                            <Chrome className="w-5 h-5 text-primary" />
                            Continue with Google
                        </Button>
                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-border"></div>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">or use email</span>
                            <div className="flex-1 h-px bg-border"></div>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    defaultValue="demo@logiq.ai"
                                    required
                                    className="pl-12 py-6 rounded-2xl bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Password</Label>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-primary/80 cursor-pointer">Forgot?</span>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    defaultValue="password"
                                    required
                                    className="pl-12 py-6 rounded-2xl bg-background/50 border-border text-foreground focus:border-primary/50 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-7 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl mt-4 shadow-lg hover:shadow-xl transition-all group"
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                            {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pb-8 pt-0">
                    <p className="text-sm text-muted-foreground font-medium">
                        New to Logiq?{' '}
                        <span className="text-primary font-bold hover:text-primary/80 transition-colors cursor-pointer">
                            Create Account
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
