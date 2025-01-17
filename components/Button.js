import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function Button(props) {
    const { text, dark, full, type, clickHandler } = props;
    return (
        <button
            onClick={ clickHandler ? clickHandler : null}
            type={type ? type : 'button'}
            className={
                'rounded-sm overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-slate-700 ' +
                (dark ? 'bg-slate-700 text-white' : 'bg-white text-slate-700') +
                (full ? 'grid place-items-center w-full' : '')
            }
        >
            <p className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${kanit.className}`}>{text}</p>
        </button>
    );
}
