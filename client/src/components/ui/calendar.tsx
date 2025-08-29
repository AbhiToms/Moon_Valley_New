import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-2",
        caption: "flex justify-center pt-1 pb-2 relative items-center",
        caption_label: "text-lg font-poppins font-semibold text-primary dark:text-text-primary tracking-wide",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-primary/5 dark:bg-bg-primary p-0 border-primary/20 dark:border-mist/30 hover:bg-primary/10 dark:hover:bg-bg-primary/80 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-0.5 mt-1",
        head_row: "flex mb-1",
        head_cell:
          "text-primary dark:text-tropical rounded-lg w-8 h-5 font-medium text-xs uppercase tracking-wider flex items-center justify-center bg-primary/5 dark:bg-tropical/20 mx-0.5",
        row: "flex w-full mt-0.5",
        cell: "h-7 w-8 text-center text-sm p-0 relative mx-0.5 focus-within:relative focus-within:z-20",
        day: cn(
          "h-7 w-8 p-0 font-medium text-center inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/20 dark:hover:bg-gray-700 text-gray-700 dark:text-text-primary transition-all duration-200 hover:scale-105 hover:shadow-sm"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "!bg-gradient-to-r !from-primary !to-tropical !text-white hover:!bg-gradient-to-r hover:!from-primary hover:!to-tropical focus:!bg-gradient-to-r focus:!from-primary focus:!to-tropical !shadow-lg hover:!shadow-xl !transform hover:!scale-110 !transition-all !duration-300 !font-semibold !border-0 !outline-0",
        day_today: "bg-surface dark:bg-bg-primary text-primary dark:text-tropical border-2 border-primary/40 dark:border-mist/30 font-semibold shadow-sm",
        day_outside:
          "day-outside text-gray-400 dark:text-text-secondary opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-gray-400 dark:text-gray-600 opacity-40 cursor-not-allowed hover:bg-transparent hover:scale-100",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-3 w-3 text-primary dark:text-tropical" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-3 w-3 text-primary dark:text-tropical" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }