
import { ThemeProvider } from "next-themes"
const Theme = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme='system'>
            {children}
        </ThemeProvider>
    )
}

export default Theme