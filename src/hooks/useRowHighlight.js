import { useState, useEffect } from 'react'

export function useRowHighlight(rowCount, intervalMs = 750) {
  const [activeRow, setActiveRow] = useState(0)

useEffect(() => {
  if (rowCount <= 1) return
  //console.log('interval started')
  const timer = setInterval(() => {
    setActiveRow((r) => (r + 1) % rowCount)
  }, intervalMs)
  return () => {
  //  console.log('interval stopped')
    clearInterval(timer)
  }
}, [rowCount, intervalMs])

  return activeRow
}