import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"

export const formatDate = (dateString) => {
  const date = new Date(dateString)

  if (isToday(date)) {
    return `Today at ${format(date, "h:mm a")}`
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mm a")}`
  }

  return format(date, "MMM d, yyyy 'at' h:mm a")
}

export const formatRelativeTime = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export const formatShortDate = (dateString) => {
  const date = new Date(dateString)

  if (isToday(date)) {
    return format(date, "h:mm a")
  }

  if (isYesterday(date)) {
    return "Yesterday"
  }

  return format(date, "MMM d")
}
