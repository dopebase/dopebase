export function formatTimestamp(timestamp: string): string {
  var d: Date = new Date(parseInt(timestamp) * 1000)

  if (d.getTime() !== d.getTime()) {
    d = new Date()
  }

  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}
