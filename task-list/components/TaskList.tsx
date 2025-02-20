"use client"

import { useState, useEffect } from "react"
import Task from "./Task"
import TaskForm from "./TaskForm"
import ExportButton from "./ExportButton"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { differenceInHours } from "date-fns"

interface TaskItem {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: string | null
  status: "onTime" | "approaching" | "late"
  deletedAt: string | null
}

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [deletedTasks, setDeletedTasks] = useState<TaskItem[]>([])
  const [showLateDialog, setShowLateDialog] = useState(false)
  const [completedLateTask, setCompletedLateTask] = useState<TaskItem | null>(null)

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    const storedDeletedTasks = localStorage.getItem("deletedTasks")
    if (storedTasks) setTasks(JSON.parse(storedTasks))
    if (storedDeletedTasks) setDeletedTasks(JSON.parse(storedDeletedTasks))
  }, [])

  // Save tasks to localStorage and create backup
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
  }, [tasks, deletedTasks])

  // Clean up deleted tasks after 48 hours
  useEffect(() => {
    const interval = setInterval(
      () => {
        setDeletedTasks((prevDeletedTasks) =>
          prevDeletedTasks.filter((task) => {
            if (!task.deletedAt) return true
            const hoursSinceDelete = differenceInHours(new Date(), new Date(task.deletedAt))
            return hoursSinceDelete < 48
          }),
        )
      },
      1000 * 60 * 60,
    ) // Check every hour

    return () => clearInterval(interval)
  }, [])

  const addTask = (task: TaskItem) => {
    setTasks((prev) => [...prev, task])
  }

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id)
    if (taskToDelete) {
      const updatedTask = { ...taskToDelete, deletedAt: new Date().toISOString() }
      setDeletedTasks((prev) => [...prev, updatedTask])
      setTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const restoreTask = (id: string) => {
    const taskToRestore = deletedTasks.find((t) => t.id === id)
    if (taskToRestore) {
      const restoredTask = { ...taskToRestore, deletedAt: null }
      setTasks((prev) => [...prev, restoredTask])
      setDeletedTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const permanentDelete = (id: string) => {
    setDeletedTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTask = (updatedTask: TaskItem) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          if (task.status === "late" && updatedTask.completed) {
            setCompletedLateTask(updatedTask)
            setShowLateDialog(true)
          }
          return updatedTask
        }
        return task
      }),
    )
  }

  const activeTasks = tasks.filter((task) => !task.completed && task.status !== "late")
  const lateTasks = tasks.filter((task) => !task.completed && task.status === "late")
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 space-y-6">
      <TaskForm onSubmit={addTask} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Tasks</h2>
        {activeTasks.map((task) => (
          <Task key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </div>

      {lateTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-600">Late Tasks</h2>
          {lateTasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Completed Tasks</h2>
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </div>
      )}

      {deletedTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-600">Trash Bin</h2>
          {deletedTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-500">{task.title}</span>
              <div className="space-x-2">
                <Button onClick={() => restoreTask(task.id)}>Restore</Button>
                <Button variant="destructive" onClick={() => permanentDelete(task.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ExportButton tasks={tasks} />

      <Dialog open={showLateDialog} onOpenChange={setShowLateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Good job!</DialogTitle>
          </DialogHeader>
          <p>You completed a late task: {completedLateTask?.title}</p>
          <DialogFooter>
            <Button onClick={() => setShowLateDialog(false)}>Thanks!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

