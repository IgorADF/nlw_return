import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
    setScreenShot: (screenshot: string | null) => void
    screenShot: string | null
}

export function ScreenshotButton(props: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        try {
            setIsTakingScreenshot(true)

            const canvas = await html2canvas(document.querySelector('html')!)
            const base64image = canvas.toDataURL('image/png')
            props.setScreenShot(base64image)
        } catch (error) {
            alert(error)
        } finally {
            setIsTakingScreenshot(false)
        }
    }

    if (props.screenShot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={
                    {
                        backgroundImage: `url(${props.screenShot})`,
                        backgroundPosition: 'right bottom',  // existe só para aparecer algo na preview, já que a tela é toda preta
                        backgroundSize: 180 // existe só para aparecer algo na preview, já que a tela é toda preta
                    }
                }
                onClick={() => props.setScreenShot(null)}
            >
                <Trash weight="fill" />
            </button>
        )
    }

    return (
        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >
            {
                isTakingScreenshot
                    ?
                    <Loading />
                    :
                    <Camera className="w-6 h-6 text-zinx" />
            }
        </button>
    )
}