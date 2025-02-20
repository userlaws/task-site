"use client"

import type React from "react"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Input } from "@/components/ui/input"

interface TaskProps {
  task: {
    id: string
    title: string
    description: string
    completed: boolean
    dueDate: string | null
    status: "onTime" | "approaching" | "late"
    deletedAt?: string | null
  }
  onUpdate: (task: TaskProps["task"]) => void
  onDelete: (id: string) => void
}

export default function Task({ task, onUpdate, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [dueTime, setDueTime] = useState(() => {
    if (task.dueDate) {
      const date = parseISO(task.dueDate)
      return format(date, "HH:mm")
    }
    return "00:00"
  })

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const [hours, minutes] = dueTime.split(":").map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours || 0, minutes || 0, 0, 0)
      onUpdate({ ...task, dueDate: newDate.toISOString(), status: "onTime" })
    } else {
      onUpdate({ ...task, dueDate: null, status: "onTime" })
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setDueTime(newTime)

    if (task.dueDate) {
      const date = parseISO(task.dueDate)
      const [hours, minutes] = newTime.split(":").map(Number)
      date.setHours(hours || 0, minutes || 0, 0, 0)
      onUpdate({ ...task, dueDate: date.toISOString() })
    }
  }

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-300 ${
        task.completed
          ? "opacity-60"
          : task.status === "approaching"
            ? "animate-pulse bg-yellow-100"
            : task.status === "late"
              ? "bg-red-100"
              : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <Checkbox checked={task.completed} onCheckedChange={() => onUpdate({ ...task, completed: !task.completed })} />
        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg border"
            />
          ) : (
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[130px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {task.dueDate ? format(parseISO(task.dueDate), "MMM d") : "Set date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={task.dueDate ? parseISO(task.dueDate) : undefined}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <Input
              type="time"
              value={dueTime}
              onChange={handleTimeChange}
              className="w-20 border-0 p-0 focus-visible:ring-0"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
            <span className="sr-only">Delete task</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </Button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg border"
        />
      ) : (
        <p className="mt-2 text-gray-600">{task.description}</p>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button
              onClick={() => {
                onUpdate({ ...task, title, description })
                setIsEditing(false)
              }}
            >
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  )
}

