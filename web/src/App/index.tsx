import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { createBanner, sanitizeBannerInput } from '@/lib/banner'
import './index.css'

const DEFAULT_TEXT = ''
const MAX_CHARACTERS = 20
const INPUT_RULES_HINT = 'A-Z and spaces only.'
const SANITIZED_INPUT_NOTICE = 'Input was cleaned to fit the banner rules.'
const COPY_NOTICE_DURATION_MS = 1800
const INPUT_NOTICE_DURATION_MS = 2400
const REPOSITORY_URL = 'https://github.com/coleman-zachery/markdown-banner'

type CopyFeedback = {
  kind: 'success' | 'error'
  message: string
  target: 'banner' | 'markdown'
}

async function writeClipboard(value: string): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // Fall back to selection-based copy below.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.append(textarea)
  textarea.select()
  textarea.setSelectionRange(0, value.length)

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [inputNotice, setInputNotice] = useState('')
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback | null>(null)

  const banner = useMemo(() => {
    if (!text.trim()) {
      return null
    }

    return createBanner(text)
  }, [text])

  useEffect(() => {
    if (!inputNotice) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setInputNotice('')
    }, INPUT_NOTICE_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [inputNotice])

  useEffect(() => {
    if (!copyFeedback) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setCopyFeedback(null)
    }, COPY_NOTICE_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [copyFeedback])

  async function copyValue(value: string, label: string, target: CopyFeedback['target']) {
    const copied = await writeClipboard(value)
    if (copied) {
      setCopyFeedback({
        kind: 'success',
        message: `${label} copied`,
        target,
      })
      return
    }

    setCopyFeedback({
      kind: 'error',
      message: 'Copy failed',
      target,
    })
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = sanitizeBannerInput(event.target.value, MAX_CHARACTERS)
    setText(nextValue.value)

    if (nextValue.changed) {
      setInputNotice(SANITIZED_INPUT_NOTICE)
    }
  }

  return (
    <div className="app">
      <main className="shell">
        <header className="header">
          <div className="header__row">
            <div className="header__brand">
              <img
                className="header__brandmark"
                src={`${import.meta.env.BASE_URL}brandmark.svg`}
                alt="Markdown Banner brandmark"
              />
              <div>
                <p className="header__eyebrow">Markdown Banner</p>
                <h1>ASCII README banner generator</h1>
                <p className="header__lede">Type a short phrase, then copy the text.</p>
              </div>
            </div>

            <a
              className="header__link"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
            >
              View source
            </a>
          </div>
        </header>

        <section className="toolbar panel">
          <label className="field" htmlFor="banner-text">
            <div className="field__label">
              <span>Text</span>
              <span>{text.length} / {MAX_CHARACTERS}</span>
            </div>
            <div className="field__control">
              <input
                id="banner-text"
                type="text"
                value={text}
                maxLength={MAX_CHARACTERS}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="characters"
                aria-describedby="banner-status"
                onChange={handleInputChange}
              />
            </div>
          </label>

          <div className="toolbar__actionsWrap">
            <div className="toolbar__actions">
              <div className="toolbar__action">
                <div
                  className={`toolbar__feedback ${copyFeedback?.target === 'banner' ? 'toolbar__feedback--visible' : ''} ${copyFeedback?.target === 'banner' && copyFeedback.kind === 'error' ? 'toolbar__feedback--error' : ''}`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {copyFeedback?.target === 'banner' ? copyFeedback.message : ''}
                </div>
                <button
                  type="button"
                  className="button button--secondary"
                  disabled={!banner}
                  onClick={() => banner && copyValue(banner.art, 'Banner', 'banner')}
                >
                  Copy banner
                </button>
              </div>

              <div className="toolbar__action">
                <div
                  className={`toolbar__feedback ${copyFeedback?.target === 'markdown' ? 'toolbar__feedback--visible' : ''} ${copyFeedback?.target === 'markdown' && copyFeedback.kind === 'error' ? 'toolbar__feedback--error' : ''}`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {copyFeedback?.target === 'markdown' ? copyFeedback.message : ''}
                </div>
                <button
                  type="button"
                  className="button button--primary"
                  disabled={!banner}
                  onClick={() => banner && copyValue(banner.markdown, 'Markdown', 'markdown')}
                >
                  Copy Markdown
                </button>
              </div>
            </div>
          </div>

          <p
            id="banner-status"
            className="toolbar__status"
            role="status"
          >
            {inputNotice || INPUT_RULES_HINT}
          </p>
        </section>

        <section className="outputs">
          <article className="panel output">
            <div className="output__header">
              <div>
                <p className="output__eyebrow">Banner</p>
                <h2>Rendered</h2>
              </div>
              {banner && (
                <div className="output__meta">
                  <span>{banner.width} cols</span>
                  <span>{banner.lineCount} lines</span>
                </div>
              )}
            </div>

            <pre className="code-block">
              {banner?.art || 'Type text above to generate a banner.'}
            </pre>
          </article>

          <article className="panel output">
            <div className="output__header">
              <div>
                <p className="output__eyebrow">Markdown</p>
                <h2>README block</h2>
              </div>
            </div>

            <pre className="code-block code-block--soft">
              {banner?.markdown || '```text\n\n```'}
            </pre>
          </article>
        </section>
      </main>
    </div>
  )
}
