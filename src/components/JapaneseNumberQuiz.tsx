import { useEffect, useMemo, useState } from 'react'

type QuizEntry = {
  value: number
  romaji: string
  kana: string
  kanji: string
}

const NUMBERS: QuizEntry[] = [
  { value: 0, romaji: 'rei', kana: 'れい', kanji: '零' },
  { value: 1, romaji: 'ichi', kana: 'いち', kanji: '一' },
  { value: 2, romaji: 'ni', kana: 'に', kanji: '二' },
  { value: 3, romaji: 'san', kana: 'さん', kanji: '三' },
  { value: 4, romaji: 'yon', kana: 'よん', kanji: '四' },
  { value: 5, romaji: 'go', kana: 'ご', kanji: '五' },
  { value: 6, romaji: 'roku', kana: 'ろく', kanji: '六' },
  { value: 7, romaji: 'nana', kana: 'なな', kanji: '七' },
  { value: 8, romaji: 'hachi', kana: 'はち', kanji: '八' },
  { value: 9, romaji: 'kyuu', kana: 'きゅう', kanji: '九' },
  { value: 10, romaji: 'juu', kana: 'じゅう', kanji: '十' }
]

const buildOptions = (answerIndex: number) => {
  const options = new Set<number>()
  options.add(answerIndex)
  while (options.size < 4) {
    options.add(Math.floor(Math.random() * NUMBERS.length))
  }
  return Array.from(options)
}

const shuffle = (items: number[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

type JapaneseNumberQuizProps = {
  span?: 1 | 2 | 3 | 4
}

export function JapaneseNumberQuiz({ span = 1 }: JapaneseNumberQuizProps) {
  const [questionIndex, setQuestionIndex] = useState(
    Math.floor(Math.random() * NUMBERS.length)
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [slideKey, setSlideKey] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const options = useMemo(() => {
    return shuffle(buildOptions(questionIndex))
  }, [questionIndex])

  const current = NUMBERS[questionIndex]

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) {
      return
    }
    setSelected(optionIndex)
    setIsCorrect(optionIndex === questionIndex)
  }

  const nextQuestion = () => {
    let next = Math.floor(Math.random() * NUMBERS.length)
    if (next === questionIndex) {
      next = (next + 1) % NUMBERS.length
    }
    setQuestionIndex(next)
    setSelected(null)
    setIsCorrect(null)
    setSeconds(0)
    setSlideKey((current) => current + 1)
  }

  return (
    <article className={`tile quiz tile--span-${span}`}>
      <div className="tile-top">
        <p className="tile-title">Number Quiz</p>
        <span className="tile-tag">Test</span>
      </div>
      <div className="quiz-main">
        <div className="quiz-slide" key={slideKey}>
          <p className="quiz-question">Which number is {current.romaji}?</p>
          <div className="quiz-prompt">
            <span>{current.kanji}</span>
            <span>{current.kana}</span>
          </div>
          <div className="quiz-options">
            {options.map((optionIndex) => {
              const option = NUMBERS[optionIndex]
              const state =
                selected === null
                  ? ''
                  : optionIndex === questionIndex
                    ? 'quiz-option--correct'
                    : optionIndex === selected
                      ? 'quiz-option--wrong'
                      : ''
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`quiz-option ${state}`.trim()}
                  onClick={() => handleSelect(optionIndex)}
                >
                  {option.value}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="quiz-footer">
        <button className="quiz-next" type="button" onClick={nextQuestion}>
          Next
        </button>
        <div className="quiz-meta">
          <span className="quiz-timer">Time: {seconds}s</span>
          <span
            className={
              isCorrect === null
                ? 'quiz-result'
                : isCorrect
                  ? 'quiz-result quiz-result--correct'
                  : 'quiz-result quiz-result--wrong'
            }
          >
            {isCorrect === null ? ' ' : isCorrect ? 'Correct' : 'Wrong'}
          </span>
        </div>
      </div>
    </article>
  )
}
