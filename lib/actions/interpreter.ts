"use server";

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types";

export async function getInterpreters() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "interpreter");

    if (error) {
        console.error("Error fetching interpreters:", error);
        return [];
    }

    return data as Profile[];
}

export async function getInterpreterById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching interpreter:", error);
        return null;
    }

    return data as Profile;
}
