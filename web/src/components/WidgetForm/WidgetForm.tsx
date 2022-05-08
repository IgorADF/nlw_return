import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            src: bugImageUrl,
            alt: 'Imagem de um inseto',
        }
    },
    IDEIA: {
        title: 'Ideia',
        image: {
            src: ideaImageUrl,
            alt: 'Imagem de uma lampada',
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            src: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento',
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {
                feedbackSent
                    ?
                    <FeedbackSuccessStep
                    handleRestartFeedback={handleRestartFeedback}
                    />
                    :
                    (
                        feedbackType
                            ?
                            <FeedbackContentStep
                                feedbackType={feedbackType}
                                handleRestartFeedback={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                            :
                            <>
                                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                            </>
                    )
            }

            <footer className="text-xs text-neutral-400">
                <span>Feito com carinho pelo <a href="https://github.com/" className="underline underline-offset-2">Igor :D</a></span>
            </footer>
        </div>
    )
}