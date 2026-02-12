"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/actions/booking";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/types";

// Fallback to simpler inputs if Calendar component isn't available/setup
// We will use native date/time inputs for stability as requested.

export default function BookingForm({
    interpreter,
    userId
}: {
    interpreter: Profile,
    userId?: string
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const duration = Number(formData.get("duration"));
        const location = formData.get("location") as string;
        const notes = formData.get("notes") as string;

        const res = await createBooking({
            interpreter_id: interpreter.id,
            date,
            start_time: time,
            duration_minutes: duration,
            location,
            notes,
        });

        setLoading(false);

        if (res.error) {
            setError(res.error);
        } else {
            router.push("/termine");
        }
    }

    return (
        <form action={onSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input type="date" name="date" required className="bg-muted border-0" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="time">Uhrzeit</Label>
                    <Input type="time" name="time" required className="bg-muted border-0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Dauer (Minuten)</Label>
                    <Input type="number" name="duration" defaultValue="60" required className="bg-muted border-0" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Ort / Adresse</Label>
                <Input name="location" placeholder="Online oder Adresse" className="bg-muted border-0" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Anmerkungen</Label>
                <Textarea name="notes" placeholder="Worum geht es bei dem Termin?" className="bg-muted border-0" />
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full bg-petrol-600 hover:bg-petrol-700" disabled={loading}>
                    {loading ? "Wird gebucht..." : "Kostenpflichtig buchen"}
                </Button>
            </div>
        </form>
    );
}
