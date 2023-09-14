export default function readTimeEstimate(str: string): string {
  const wordCount: number = str.split(' ').length
  const minutes: number = 1 + wordCount / 250
  return `${minutes.toFixed(0)} min`
}
