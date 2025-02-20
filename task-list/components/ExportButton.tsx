import { Button } from "@/components/ui/button"
import ical from "ical-generator"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: string | null
}

interface ExportButtonProps {
  tasks: Task[]
}

export default function ExportButton({ tasks }: ExportButtonProps) {
  const handleExport = () => {
    const calendar = ical({ name: "My Task List" })

    tasks.forEach((task) => {
      calendar.createEvent({
        start: task.dueDate ? new Date(task.dueDate) : new Date(),
        summary: task.title,
        description: task.description,
        status: task.completed ? "COMPLETED" : "NEEDS-ACTION",
      })
    })

    const blob = new Blob([calendar.toString()], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "tasks.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport} className="w-full rounded-xl">
      Export as iCal
    </Button>
  )
}

