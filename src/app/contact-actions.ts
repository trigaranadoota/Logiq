'use server'

import { createClient } from '@/lib/supabase/server'

export async function getRecentContacts() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    // Fetch unique opponents from recent matches
    const { data: matches, error } = await supabase
        .from('matches')
        .select(`
      player1_id,
      player2_id,
      profiles!matches_player2_id_fkey(id, username, avatar_url)
    `)
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(10)

    if (error) {
        console.error('Error fetching contacts:', error)
        return []
    }

    // Extract profiles of opponents
    const contacts = matches.map(m => {
        if (m.player1_id === user.id) return m.profiles
        // Handle player1_id if searching by player2_id (would need another join or separate query)
        return null
    }).filter(Boolean)

    return contacts
}
