import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  disabled = false,
  minDate,
  className
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (onDateChange) {
      onDateChange(selectedDate)
    }
    setOpen(false)
  }

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return placeholder
    try {
      return format(date, "PPP")
    } catch (error) {
      return placeholder
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-gradient-to-r from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary text-gray-800 dark:text-white border-2 border-neutral/30 dark:border-mist/30 hover:border-primary/50 dark:hover:border-tropical/50 hover:bg-gradient-to-r hover:from-surface/90 hover:to-neutral/90 dark:hover:from-bg-primary/90 dark:hover:to-bg-secondary/90 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md min-h-[48px] px-4",
            !date && "text-gray-500 dark:text-gray-400",
            date && "text-primary dark:text-text-primary font-medium",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-tropical/10 dark:from-primary/20 dark:to-tropical/20 mr-3">
              <CalendarIcon className="h-4 w-4 text-primary dark:text-tropical" />
            </div>
            <span className="flex-1 text-left">
              {formatDisplayDate(date)}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white dark:bg-bg-secondary border-0 dark:border dark:border-mist/20 shadow-2xl rounded-3xl" 
        align="start"
        sideOffset={8}
      >
        <div className="p-2 bg-primary/5 dark:bg-tropical/20 rounded-t-3xl border-b border-primary/10 dark:border-mist/20">
          <div className="text-center py-2">
            <span className="text-sm font-medium text-primary dark:text-tropical uppercase tracking-wider">
              Select Date
            </span>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={(date) => {
            if (minDate) {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const checkDate = new Date(date)
              checkDate.setHours(0, 0, 0, 0)
              const minDateCheck = new Date(minDate)
              minDateCheck.setHours(0, 0, 0, 0)
              return checkDate < minDateCheck
            }
            return false
          }}
          initialFocus
          className="rounded-b-3xl"
        />
      </PopoverContent>
    </Popover>
  )
}