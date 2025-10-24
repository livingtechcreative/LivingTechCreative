"use client"

import { useEffect } from "react"

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // Console Easter Egg - langsung muncul saat component mount
    console.log(`

 _     _       _             _            _                           _   _

| |   (_)     (_)           | |          | |                         | | (_)

| |    ___   ___ _ __   __ _| |_ ___  ___| |__     ___ _ __ ___  __ _| |_ ___   _____

| |   | \\ \\ / / | '_ \\ / _\` | __/ _ \\/ __| '_ \\   / __| '__/ _ \\/ _\` | __| \\ \\ / / _ \\

| |___| |\\ V /| | | | | (_| | ||  __/ (__| | | | | (__| | |  __/ (_| | |_| |\\ V /  __/

\\_____|_| \\_/ |_|_| |_|\\__, |\\__\\___|\\___\\_| |_|  \\___|_|  \\___|\\__, |\\__|_| \\_/ \\___|

                        __/ |

                       |___/

`)

    console.log('📱 Want to work with us? Contact us on WhatsApp:')

    console.log('  📞 +62 896-5903-84')

    console.log('  🔗 https://wa.me/62896590384')
  }, [])

  // Component ini tidak render apa-apa
  return null
}