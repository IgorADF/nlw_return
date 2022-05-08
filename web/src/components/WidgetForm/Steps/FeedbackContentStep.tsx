import { ArrowLeft } from "phosphor-react"
import { FormEvent, useState } from "react"
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../Loading"
import { ScreenshotButton } from "../ScreenshotButton"
import { FeedbackType, feedbackTypes } from "../WidgetForm"

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    handleRestartFeedback: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep(props: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState<string>('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypesInfo = feedbackTypes[props.feedbackType]

    async function onSubmitForm(event: FormEvent) {
        try {
            setIsSendingFeedback(true)

            event.preventDefault()

            await api.post(`/feedbacks`, {
                type: props.feedbackType,
                comment,
                screenshot,
            })

            props.onFeedbackSent()
        } catch (error) {
            alert(error)
        } finally {
            setIsSendingFeedback(false)
        }
    }

    return (
        <>
            <header className="flex flex-col">
                <button
                    type="button"
                    onClick={() => props.handleRestartFeedback()}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4 top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" />
                </button>

                <span className="text-xl leading-6 flex justify-center gap-2">
                    <img src={feedbackTypesInfo.image.src} alt={feedbackTypesInfo.image.alt} className='w-6 h-6' />
                    {feedbackTypesInfo.title}
                </span>

                <CloseButton />

                <form
                    className="my-4 w-full"
                    onSubmit={onSubmitForm}
                >
                    <textarea
                        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 border-2 border-solid bg-transparent rounded-md focus:ring-violet-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
                        placeholder="Conte o que aconteceu"
                        value={comment}
                        onChange={event => setComment(event?.target.value)}
                    />

                    <footer className="flex gap-2 mt-2">
                        <ScreenshotButton
                            setScreenShot={setScreenshot}
                            screenShot={screenshot}
                        />

                        <button
                            type="submit"
                            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                            disabled={!comment || isSendingFeedback}
                        >
                            {isSendingFeedback ? <Loading /> : `Enviar feedback`}
                        </button>
                    </footer>
                </form>
            </header>
        </>
    )
}