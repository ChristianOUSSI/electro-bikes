import { Dictionary } from "@/i18n/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6">
        <p>{dict.footer.about}</p>
        <p>
          © {new Date().getFullYear()} eVolt. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
