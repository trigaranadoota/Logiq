'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loggedInUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Camera,
  Mail,
  Linkedin,
  Globe,
  Briefcase,
} from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  role: z.string().min(5, 'Headline must be at least 5 characters.'),
  goals: z.string().min(10, 'Bio must be at least 10 characters.'),
  skills: z.string(),
  education: z.string().optional(),
  targetRole: z.string().optional(),
  experienceLevel: z.enum(['Student', 'Fresher', 'Professional']),
  links: z.object({
    email: z.string().email('Please enter a valid email.'),
    linkedin: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
    portfolio: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
    website: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  }),
  preferences: z.object({
    interests: z.array(z.string()),
    preparingFor: z.array(z.string()),
    mockInterviews: z.boolean(),
  }),
  privacy: z.object({
    public: z.boolean(),
    showStats: z.boolean(),
    allowRequests: z.boolean(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const interestsList = [
  { id: 'Aptitude', label: 'Aptitude' },
  { id: 'Coding', label: 'Coding' },
  { id: 'HR', label: 'HR Interviews' },
  { id: 'System Design', label: 'System Design' },
];

const preparingForList = [
  { id: 'Placements', label: 'Placements' },
  { id: 'Tech Roles', label: 'Tech Roles' },
  { id: 'Exams', label: 'Competitive Exams' },
  { id: 'Internships', label: 'Internships' },
];

export default function EditProfilePage() {
  const { toast } = useToast();
  const user = loggedInUser as Required<User>;

  const defaultValues: Partial<ProfileFormValues> = {
    name: user.name,
    username: user.username,
    role: user.role,
    goals: user.goals,
    skills: user.skills.join(', '),
    education: user.education,
    targetRole: user.targetRole,
    experienceLevel: user.experienceLevel,
    links: {
      email: user.links.email,
      linkedin: user.links.linkedin,
      portfolio: user.links.portfolio,
      website: user.links.website,
    },
    preferences: user.preferences,
    privacy: user.privacy,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Saved',
      description: 'Your changes have been saved successfully.',
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-24">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b -mx-8 px-8 -mt-8 pt-6 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="-ml-2">
                <Link href="/profile">
                  <ArrowLeft />
                </Link>
              </Button>
              <h1 className="text-xl font-headline font-bold">Edit Profile</h1>
            </div>
            <Button type="submit">Save</Button>
          </div>
        </div>

        {/* Profile Photo Section */}
        <Card className="overflow-visible">
          <CardContent className="pt-6">
            <div className="relative h-24 mb-16">
              <div className="w-full h-24 rounded-lg bg-muted overflow-hidden">
                 <Image
                    src={user.bannerUrl}
                    alt="Banner"
                    width={1200}
                    height={200}
                    className="w-full h-full object-cover"
                 />
              </div>
              <Button size="icon" variant="outline" className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 border-white/20 text-white">
                <Camera className="h-4 w-4" />
              </Button>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-background">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute bottom-1 right-1 h-8 w-8">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
             <div className="text-center">
                  <Button variant="link">Upload Photo</Button>
                  <Button variant="link" className="text-destructive">Remove</Button>
              </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">@</span>
                       <Input placeholder="your_username" className="pl-7" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Career Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Product Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about your goals"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter skills, separated by commas" {...field} />
                  </FormControl>
                  <FormDescription>
                    e.g., Product Strategy, Agile Methodologies, UX Design
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., M.S. in Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Head of Product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Fresher">Fresher</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                       </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        {/* Contact & Links */}
        <Card>
            <CardHeader>
                <CardTitle>Contact & Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="links.email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input type="email" placeholder="your@email.com" className="pl-10" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="links.linkedin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="linkedin.com/in/..." className="pl-10" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="links.portfolio"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Portfolio</FormLabel>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="your-portfolio.com" className="pl-10" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="links.website"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Personal Website</FormLabel>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="your-website.com" className="pl-10" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="preferences.interests"
              render={() => (
                <FormItem>
                    <FormLabel>Areas of Interest</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                        {interestsList.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="preferences.interests"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                (value) => value !== item.id
                                                )
                                            );
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                );
                            }}
                            />
                        ))}
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.preparingFor"
              render={() => (
                <FormItem>
                    <FormLabel>Preparing For</FormLabel>
                     <div className="grid grid-cols-2 gap-4">
                        {preparingForList.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="preferences.preparingFor"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                (value) => value !== item.id
                                                )
                                            );
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                );
                            }}
                            />
                        ))}
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.mockInterviews"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Available for Mock Interviews</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Privacy Settings */}
         <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="privacy.public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Public Profile</FormLabel>
                    <FormDescription>Allow anyone to view your profile.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy.showStats"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Stats</FormLabel>
                     <FormDescription>Display your stats on your public profile.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                       disabled={!form.watch('privacy.public')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy.allowRequests"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Allow Connection Requests</FormLabel>
                     <FormDescription>Let other users send you connection requests.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

      </form>
    </Form>
  );
}
