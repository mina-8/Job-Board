'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ToggelTheme = () => {
    const { theme, setTheme } = useTheme()
  const [Mounted , setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true)
  } , [])
  if (!Mounted) return null
  return (
    <button
    onClick={()=>setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md cursor-pointer"
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  )
}

export default ToggelTheme