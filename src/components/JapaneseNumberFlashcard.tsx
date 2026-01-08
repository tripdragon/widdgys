import { useState } from 'react'

const NUMBERS = [
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

type JapaneseNumberFlashcardProps = {
  span?: 1 | 2 | 3 | 4
}

export function JapaneseNumberFlashcard({
  span = 1
}: JapaneseNumberFlashcardProps) {
  const [index, setIndex] = useState(0)
  const [slideKey, setSlideKey] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next')
  const current = NUMBERS[index]

  const handleNext = () => {
    setSlideDirection('next')
    setIndex((currentIndex) => (currentIndex + 1) % NUMBERS.length)
    setSlideKey((key) => key + 1)
  }

  const handlePrev = () => {
    setSlideDirection('prev')
    setIndex((currentIndex) =>
      currentIndex === 0 ? NUMBERS.length - 1 : currentIndex - 1
    )
    setSlideKey((key) => key + 1)
  }

  const handleSelect = (entryIndex: number) => {
    if (entryIndex === index) {
      return
    }
    setSlideDirection(entryIndex > index ? 'next' : 'prev')
    setIndex(entryIndex)
    setSlideKey((key) => key + 1)
  }

  return (
    <article className={`tile flashcard tile--span-${span}`}>
      <div className="tile-top">
        <p className="tile-title">Japanese Numbers 0-10</p>
        <span className="tile-tag">Flashcard</span>
      </div>
      <div className="flashcard-main" data-direction={slideDirection}>
        <div className="flashcard-slide" key={slideKey}>
          <div className="flashcard-number">{current.value}</div>
          <div className="flashcard-reading">
            <span className="flashcard-kanji">{current.kanji}</span>
            <span className="flashcard-kana">{current.kana}</span>
            <span className="flashcard-romaji">{current.romaji}</span>
          </div>
        </div>
      </div>
      <div className="flashcard-controls">
        <button className="flashcard-nav" type="button" onClick={handlePrev}>
          Prev
        </button>
        <button
          className="flashcard-nav flashcard-nav--next"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
        {NUMBERS.map((entry, entryIndex) => (
          <button
            key={entry.value}
            className={
              entryIndex === index
                ? 'flashcard-pill flashcard-pill--active'
                : 'flashcard-pill'
            }
            onClick={() => handleSelect(entryIndex)}
            type="button"
          >
            {entry.value}
          </button>
        ))}
      </div>
    </article>
  )
}
