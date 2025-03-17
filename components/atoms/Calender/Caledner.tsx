import React from 'react'

interface CalendarProps {
  onChange?: (date: Date) => void;
  value?: Date | null;
  minDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ onChange, value, minDate }) => {
  const [currentDate, setCurrentDate] = React.useState(() => value || new Date())
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    if (minDate && selectedDate < minDate) {
      return
    }
    onChange?.(selectedDate)
  }

  const isDateSelected = (day: number) => {
    if (!value) return false
    return (
      value.getDate() === day &&
      value.getMonth() === currentDate.getMonth() &&
      value.getFullYear() === currentDate.getFullYear()
    )
  }

  const isDateDisabled = (day: number) => {
    if (!minDate) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date < minDate
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={handlePrevMonth}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-lg font-semibold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={handleNextMonth}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-gray-500 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((day) => (
          <div key={`empty-${day}`} className="h-8" />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            disabled={isDateDisabled(day)}
            className={`
              h-8 rounded-full flex items-center justify-center text-sm
              ${isDateSelected(day) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
              ${isDateDisabled(day) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calendar