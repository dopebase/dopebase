export function formatDate(date: Date): string {
  let d: Date = new Date(date)

  if (Number.isNaN(d)) {
    d = new Date(date.getSeconds() * 1000)
  }

  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}
