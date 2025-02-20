"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TaskFormProps {
  onSubmit: (task: {
    id: string
    title: string
    description: string
    completed: boolean
    dueDate: null
    status: string
  }) => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        dueDate: null,
        status: "onTime",
      })
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl"
      />
      <Textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl"
      />
      <Button type="submit" className="w-full rounded-xl">
        Add Task
      </Button>
    </form>
  )
}

