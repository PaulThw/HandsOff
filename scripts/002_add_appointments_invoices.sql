CREATE TABLE IF NOT EXISTS public.termine (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dolmetscher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    kunde_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Kunde kann optional sein oder später hinzugefügt werden
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    type TEXT NOT NULL, -- 'persoenlich' oder 'video'
    location TEXT, -- Nur bei 'persoenlich'
    description TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'accepted', 'declined', 'completed', 'cancelled'
    anlass TEXT,
    kostentraeger_id UUID REFERENCES public.kostentraeger(id) ON DELETE SET NULL,
    price DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.abrechnungen (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    termin_id UUID REFERENCES public.termine(id) ON DELETE CASCADE,
    dolmetscher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    kostentraeger_id UUID REFERENCES public.kostentraeger(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'draft' NOT NULL, -- 'draft', 'sent', 'paid', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Indexe für bessere Performance
CREATE INDEX IF NOT EXISTS idx_termine_dolmetscher_id ON public.termine (dolmetscher_id);
CREATE INDEX IF NOT EXISTS idx_abrechnungen_dolmetscher_id ON public.abrechnungen (dolmetscher_id);
CREATE INDEX IF NOT EXISTS idx_abrechnungen_termin_id ON public.abrechnungen (termin_id);
