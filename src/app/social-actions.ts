'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function followUser(followingId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('follows')
        .insert({
            follower_id: user.id,
            following_id: followingId
        })

    if (error) return { error: error.message }

    revalidatePath(`/user/${followingId}`)
    revalidatePath('/profile')
    return { success: true }
}

export async function unfollowUser(followingId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', followingId)

    if (error) return { error: error.message }

    revalidatePath(`/user/${followingId}`)
    revalidatePath('/profile')
    return { success: true }
}
