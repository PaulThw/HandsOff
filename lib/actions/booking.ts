"use server";

import { createClient } from "@/lib/supabase/server";
import { Booking } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createBooking(data: Partial<Booking>) {
    const supabase = await createClient();

    // Check auth using getUser() for security
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: "Nicht authentifiziert. Bitte logge dich ein." };
    }

    // Insert booking
    const { error } = await supabase
        .from("bookings")
        .insert({
            ...data,
            user_id: user.id,
        });

    if (error) {
        console.error("Error creating booking:", error);
        return { error: "Fehler beim Erstellen der Buchung: " + error.message };
    }

    revalidatePath("/termine");
    return { success: true };
}

export async function getBookingsForUser() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from("bookings")
        .select("*, interpreter:profiles!interpreter_id(*)")
        .or(`user_id.eq.${user.id},interpreter_id.eq.${user.id}`)
        .order("date", { ascending: true });

    if (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }

    return data;
}
