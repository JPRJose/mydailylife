
import { useState } from 'react'
import './App.css'

function App() {
  const [language, setLanguage] = useState('en')

  const getToday = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [dailyNote, setDailyNote] = useState(() => {
    try {
      return localStorage.getItem(`mydailylife-note-${getToday()}`) || ''
    } catch {
      return ''
    }
  })

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('mydailylife-completed') || '[]'
      )
    } catch {
      return []
    }
  })

  const [defaultTasks, setDefaultTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('mydailylife-default-tasks') || 'null'
      )
    } catch {
      return null
    }
  })

  const [customTasks, setCustomTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('mydailylife-custom-tasks') || '[]'
      )
    } catch {
      return []
    }
  })

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskTime, setNewTaskTime] = useState('10:00')

  const [editingIndex, setEditingIndex] = useState(null)
  const [editTaskTitle, setEditTaskTitle] = useState('')
  const [editTaskTime, setEditTaskTime] = useState('10:00')
  const [editTaskDetail, setEditTaskDetail] = useState('')

  const text = {
    en: {
      greeting: 'Good day!',
      subtitle: 'Make today count.',
      date: 'YOUR DAILY PLAN',
      progress: 'Daily Progress',
      routine: 'My Routine',
      add: 'Your daily activities',
      empty: 'Your first step starts here.',
      tasks: 'tasks',
      addTitle: 'Add a new activity',
      activityName: 'Activity name',
      activityPlaceholder: 'e.g. English practice',
      activityTime: 'Activity time',
      addButton: '+ Add Activity',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      description: 'Description',
      personalActivity: 'My personal activity',
      editName: 'Activity name',
      editTime: 'Activity time',
      editDescription: 'Activity description',
      markComplete: 'Mark complete',
      markIncomplete: 'Mark incomplete',
      confirmDelete: 'Are you sure you want to delete this activity?',
      journalLabel: 'REFLECTION',
      journalTitle: 'My Daily Journal',
      journalQuestion:
        'What went well today? What would you like to improve?',
      journalPlaceholder: 'Write your thoughts here...',
      journalStatus: 'Your notes save automatically on this browser.',
      clearNote: 'Clear Today’s Note',
      confirmClear: 'Are you sure you want to clear today’s note?',
      footer: 'Your first step starts here.',
    },

    ta: {
      greeting: 'வணக்கம்!',
      subtitle: 'இன்றைய நாளை சிறப்பாகப் பயன்படுத்துங்கள்.',
      date: 'உங்கள் தினசரித் திட்டம்',
      progress: 'இன்றைய முன்னேற்றம்',
      routine: 'எனது தினசரி வழக்கம்',
      add: 'உங்கள் தினசரி செயல்கள்',
      empty: 'உங்கள் முதல் படி இங்கே தொடங்குகிறது.',
      tasks: 'செயல்கள்',
      addTitle: 'புதிய செயல்பாட்டைச் சேர்க்கவும்',
      activityName: 'செயல்பாட்டின் பெயர்',
      activityPlaceholder: 'எ.கா. ஆங்கிலப் பயிற்சி',
      activityTime: 'செயல்பாட்டு நேரம்',
      addButton: '+ செயல்பாட்டைச் சேர்',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      save: 'சேமி',
      cancel: 'ரத்து செய்',
      description: 'விளக்கம்',
      personalActivity: 'எனது தனிப்பட்ட செயல்பாடு',
      editName: 'செயல்பாட்டின் பெயர்',
      editTime: 'செயல்பாட்டு நேரம்',
      editDescription: 'செயல்பாட்டு விளக்கம்',
      markComplete: 'முடிந்ததாகக் குறி',
      markIncomplete: 'முடிக்காததாகக் குறி',
      confirmDelete: 'இந்தச் செயல்பாட்டை நீக்க விரும்புகிறீர்களா?',
      journalLabel: 'சிந்தனை',
      journalTitle: 'எனது தினசரி நாட்குறிப்பு',
      journalQuestion:
        'இன்று எது நன்றாக நடந்தது? எதை மேம்படுத்த விரும்புகிறீர்கள்?',
      journalPlaceholder: 'உங்கள் எண்ணங்களை இங்கே எழுதுங்கள்...',
      journalStatus:
        'உங்கள் குறிப்புகள் இந்த உலாவியில் தானாகச் சேமிக்கப்படும்.',
      clearNote: 'இன்றைய குறிப்பை அழி',
      confirmClear: 'இன்றைய குறிப்பை அழிக்க விரும்புகிறீர்களா?',
      footer: 'உங்கள் முதல் படி இங்கே தொடங்குகிறது.',
    },
  }

  const current = text[language]

  const defaultActivities = defaultTasks || (
    language === 'en'
      ? [
          {
            time: '06:00 AM',
            title: 'Wake up',
            detail: 'Start the day with gratitude',
          },
          {
            time: '06:15 AM',
            title: 'Bible Reading & Prayer',
            detail: 'Spend quiet time with God',
          },
          {
            time: '07:15 AM',
            title: 'Exercise',
            detail: 'Move your body and build energy',
          },
          {
            time: '08:00 AM',
            title: 'Get Ready',
            detail: 'Prepare for the day ahead',
          },
          {
            time: '09:00 AM',
            title: 'Study & Work',
            detail: 'Focus on your important tasks',
          },
          {
            time: '09:00 PM',
            title: 'Daily Reflection',
            detail: 'Review the day and give thanks',
          },
        ]
      : [
          {
            time: 'காலை 06:00',
            title: 'எழுந்திருத்தல்',
            detail: 'நன்றியுடன் நாளைத் தொடங்குங்கள்',
          },
          {
            time: 'காலை 06:15',
            title: 'வேதாகம வாசிப்பு மற்றும் ஜெபம்',
            detail: 'தேவனுடன் அமைதியான நேரம்',
          },
          {
            time: 'காலை 07:15',
            title: 'உடற்பயிற்சி',
            detail: 'உடலுக்கு உற்சாகம் கொடுங்கள்',
          },
          {
            time: 'காலை 08:00',
            title: 'தயாராகுதல்',
            detail: 'அன்றைய நாளுக்குத் தயாராகுங்கள்',
          },
          {
            time: 'காலை 09:00',
            title: 'படிப்பு மற்றும் வேலை',
            detail: 'முக்கியமான செயல்களில் கவனம் செலுத்துங்கள்',
          },
          {
            time: 'இரவு 09:00',
            title: 'நாள் சிந்தனை',
            detail: 'நாளை நினைத்துப் பார்த்து நன்றி செலுத்துங்கள்',
          },
        ]
  )

  const allTasks = [...defaultActivities, ...customTasks]

  const doneCount = allTasks.filter((_, index) =>
    completed.includes(index)
  ).length

  const percent = allTasks.length
    ? Math.round((doneCount / allTasks.length) * 100)
    : 0

  function addTask(event) {
    event.preventDefault()

    const title = newTaskTitle.trim()
    if (!title || !newTaskTime) return

    const updatedTasks = [
      ...customTasks,
      {
        time: newTaskTime,
        title,
        detail: current.personalActivity,
      },
    ]

    localStorage.setItem(
      'mydailylife-custom-tasks',
      JSON.stringify(updatedTasks)
    )

    setCustomTasks(updatedTasks)
    setNewTaskTitle('')
    setNewTaskTime('10:00')
  }

  function startEditing(index) {
    const task = allTasks[index]

    setEditingIndex(index)
    setEditTaskTitle(task.title)
    setEditTaskTime(task.time)
    setEditTaskDetail(task.detail)
  }

  function saveEditedTask(event) {
    event.preventDefault()

    const title = editTaskTitle.trim()
    if (!title || !editTaskTime) return

    const updatedTask = {
      title,
      time: editTaskTime,
      detail: editTaskDetail.trim(),
    }

    if (editingIndex < defaultActivities.length) {
      const updatedDefaults = [...defaultActivities]
      updatedDefaults[editingIndex] = updatedTask

      localStorage.setItem(
        'mydailylife-default-tasks',
        JSON.stringify(updatedDefaults)
      )

      setDefaultTasks(updatedDefaults)
    } else {
      const customIndex = editingIndex - defaultActivities.length
      const updatedCustomTasks = [...customTasks]
      updatedCustomTasks[customIndex] = updatedTask

      localStorage.setItem(
        'mydailylife-custom-tasks',
        JSON.stringify(updatedCustomTasks)
      )

      setCustomTasks(updatedCustomTasks)
    }

    setEditingIndex(null)
  }

  function deleteTask(index) {
    if (!window.confirm(current.confirmDelete)) {
      return
    }

    setCompleted((previous) => {
      const updated = previous
        .filter((item) => item !== index)
        .map((item) => (item > index ? item - 1 : item))

      localStorage.setItem(
        'mydailylife-completed',
        JSON.stringify(updated)
      )

      return updated
    })

    if (index < defaultActivities.length) {
      const updatedDefaults = defaultActivities.filter(
        (_, taskIndex) => taskIndex !== index
      )

      localStorage.setItem(
        'mydailylife-default-tasks',
        JSON.stringify(updatedDefaults)
      )

      setDefaultTasks(updatedDefaults)
    } else {
      const customIndex = index - defaultActivities.length

      const updatedCustomTasks = customTasks.filter(
        (_, taskIndex) => taskIndex !== customIndex
      )

      localStorage.setItem(
        'mydailylife-custom-tasks',
        JSON.stringify(updatedCustomTasks)
      )

      setCustomTasks(updatedCustomTasks)
    }

    setEditingIndex(null)
  }

  function toggleTask(index) {
    setCompleted((previous) => {
      const updated = previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]

      localStorage.setItem(
        'mydailylife-completed',
        JSON.stringify(updated)
      )

      return updated
    })
  }

  function displayTime(value) {
    const time = String(value).trim()

    // Keep Tamil time labels as they are.
    if (/[அ-ஹ]/.test(time)) return time

    const match = time.match(
      /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i
    )

    if (!match) return time

    let hour = Number(match[1])
    const minutes = match[2]
    const savedPeriod = match[3]?.toUpperCase()

    if (savedPeriod) {
      hour = hour % 12
      if (savedPeriod === 'PM') hour += 12
    }

    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12

    return `${String(displayHour).padStart(2, '0')}:${minutes} ${period}`
  }

  function saveDailyNote(note) {
    setDailyNote(note)

    try {
      localStorage.setItem(
        `mydailylife-note-${getToday()}`,
        note
      )
    } catch {
      // Keep the note in React state if browser storage is unavailable.
    }
  }

  function clearDailyNote() {
    if (!window.confirm(current.confirmClear)) return

    setDailyNote('')

    try {
      localStorage.removeItem(
        `mydailylife-note-${getToday()}`
      )
    } catch {
      // The visible note is still cleared.
    }
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon">✦</span>
          <span>MyDailyLife</span>
        </a>

        <button
          type="button"
          className="language-button"
          onClick={() =>
            setLanguage((previous) =>
              previous === 'en' ? 'ta' : 'en'
            )
          }
        >
          {language === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </header>

      <section className="welcome" id="home">
        <div className="welcome-copy">
          <span className="eyebrow">{current.date}</span>
          <h1>{current.greeting}</h1>
          <p>{current.subtitle}</p>
        </div>

        <div className="sun-icon" aria-hidden="true">
          ☀
        </div>
      </section>

      <section className="progress-card">
        <div className="progress-heading">
          <div>
            <span className="eyebrow">{current.progress}</span>
            <h2>
              {doneCount} / {allTasks.length}
            </h2>
          </div>

          <div className="progress-percent">{percent}%</div>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      <section className="routine-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{current.add}</span>
            <h2>{current.routine}</h2>
          </div>

          <span className="task-count">
            {allTasks.length} {current.tasks}
          </span>
        </div>

        <div className="task-list">
          <form className="add-task-form" onSubmit={addTask}>
            <h3>{current.addTitle}</h3>

            <label htmlFor="task-title">
              {current.activityName}
            </label>

            <input
              id="task-title"
              type="text"
              placeholder={current.activityPlaceholder}
              value={newTaskTitle}
              onChange={(event) =>
                setNewTaskTitle(event.target.value)
              }
              required
            />

            <label htmlFor="task-time">
              {current.activityTime}
            </label>

            <input
              id="task-time"
              type="time"
              value={newTaskTime}
              onChange={(event) =>
                setNewTaskTime(event.target.value)
              }
              required
            />

            <button type="submit" className="add-task-button">
              {current.addButton}
            </button>
          </form>

          {allTasks.map((task, index) => {
            const isDone = completed.includes(index)

            return (
              <article
                className={`task-card ${isDone ? 'is-done' : ''}`}
                key={`${index}-${task.title}`}
              >
                <span className="task-time">
                  {displayTime(task.time)}
                </span>

                <button
                  type="button"
                  className="task-check"
                  aria-label={
                    isDone
                      ? current.markIncomplete
                      : current.markComplete
                  }
                  aria-pressed={isDone}
                  onClick={() => toggleTask(index)}
                >
                  {isDone ? '✓' : ''}
                </button>

                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.detail}</p>
                </div>

                {editingIndex === index ? (
                  <form
                    className="edit-task-form"
                    onSubmit={saveEditedTask}
                  >
                    <label>
                      {current.editName}
                      <input
                        value={editTaskTitle}
                        onChange={(event) =>
                          setEditTaskTitle(event.target.value)
                        }
                        required
                      />
                    </label>

                    <label>
                      {current.editTime}
                      <input
                        type="time"
                        value={editTaskTime}
                        onChange={(event) =>
                          setEditTaskTime(event.target.value)
                        }
                        required
                      />
                    </label>

                    <label>
                      {current.editDescription}
                      <input
                        value={editTaskDetail}
                        onChange={(event) =>
                          setEditTaskDetail(event.target.value)
                        }
                        placeholder={current.description}
                      />
                    </label>

                    <button
                      type="submit"
                      className="add-task-button"
                    >
                      {current.save}
                    </button>

                    <button
                      type="button"
                      className="edit-task-button"
                      onClick={() => setEditingIndex(null)}
                    >
                      {current.cancel}
                    </button>
                  </form>
                ) : (
                  <div className="task-actions">
                    <button
                      type="button"
                      className="edit-task-button"
                      onClick={() => startEditing(index)}
                    >
                      {current.edit}
                    </button>

                    <button
                      type="button"
                      className="delete-task-button"
                      onClick={() => deleteTask(index)}
                    >
                      {current.delete}
                    </button>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="journal-section">
        <span className="eyebrow">{current.journalLabel}</span>

        <span className="journal-date">
          {new Date().toLocaleDateString(
            language === 'en' ? 'en-IN' : 'ta-IN',
            {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          )}
        </span>

        <h2>{current.journalTitle}</h2>
        <p>{current.journalQuestion}</p>

        <textarea
          className="journal-input"
          rows={5}
          placeholder={current.journalPlaceholder}
          value={dailyNote}
          onChange={(event) =>
            saveDailyNote(event.target.value)
          }
        />

        <span className="journal-status">
          {current.journalStatus}
        </span>

        <button
          type="button"
          className="clear-note-button"
          onClick={clearDailyNote}
        >
          {current.clearNote}
        </button>
      </section>

      <footer className="footer">
        <span>✦ MyDailyLife</span>
        <p>{current.footer}</p>
      </footer>
    </main>
  )
}

export default App
