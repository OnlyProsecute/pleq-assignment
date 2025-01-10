import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function Dashboard() {
   
    const statuses = {
    floor: 5,
    room_number: '05A26',
    }

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12">
        <div className='grid grid-cols-1 md:grid-cols-3 bg-slate-50 text-slate-700 rounded-md p-4 gap-4  custom_shadow'>
            {Object.keys(statuses).map((status, statusIndex) => {
                return(
                    <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
                        <p className={`font-medium uppercase text-size-xs sm:text-size-sm6 truncate ${kanit.className}`}>{status.replaceAll('_', ' ')}</p>
                        <p className={` sm:text-lg${kanit.className}`}>{statuses[status]}</p>
                    </div> 
                )
            })}
        </div>
    </div>
    )
}
