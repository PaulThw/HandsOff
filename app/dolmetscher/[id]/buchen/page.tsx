import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { getInterpreterById } from "@/lib/actions/interpreter";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BookingForm from "@/components/booking-form";

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const interpreter = await getInterpreterById(id);

  if (!interpreter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b border-border sticky top-0 bg-background z-10">
        <Link href={`/dolmetscher/${id}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold">Termin buchen</h1>
      </div>

      <div className="container p-4 max-w-md mx-auto">
        <div className="bg-secondary rounded-xl p-4 mb-6 flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={interpreter.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>
              {interpreter.full_name?.substring(0, 2) || "??"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">{interpreter.full_name}</div>
            <div className="text-sm text-gray-400">{interpreter.hourly_rate} €/h</div>
          </div>
        </div>

        <BookingForm interpreter={interpreter} />
      </div>
    </main>
  );
}
