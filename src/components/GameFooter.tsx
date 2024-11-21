import { Button } from "@/components/ui/button"
import { Maximize, Info } from 'lucide-react'

export function GameFooter() {
    return (
        <div className="flex justify-between">
            <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
            >
                <Maximize className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
            >
                <Info className="h-4 w-4" />
            </Button>
        </div>
    )
} 