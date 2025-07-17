;; Bitcoin Developer Academy - Progress Tracker Contract
;; This contract tracks student progress through courses and modules

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_OWNER_ONLY (err u100))
(define-constant ERR_INVALID_MODULE (err u101))
(define-constant ERR_MODULE_ALREADY_COMPLETED (err u102))
(define-constant ERR_INVALID_COURSE (err u103))
(define-constant ERR_UNAUTHORIZED (err u104))

;; Data Variables
(define-data-var total-students uint u0)
(define-data-var total-modules-completed uint u0)

;; Data Maps
(define-map user-progress principal {
  completed-modules: (list 100 uint),
  current-course: (optional uint),
  total-points: uint,
  current-streak: uint,
  last-activity: uint,
  skill-level: uint,
  total-time-spent: uint
})

(define-map module-info uint {
  course-id: uint,
  name: (string-ascii 50),
  description: (string-ascii 200),
  points-reward: uint,
  difficulty: uint,
  estimated-time: uint,
  is-active: bool
})

(define-map course-modules uint (list 50 uint))
(define-map module-completions {module-id: uint, student: principal} {
  completed-at: uint,
  time-spent: uint,
  score: uint,
  attempts: uint
})

(define-map daily-activity {date: uint, student: principal} {
  modules-completed: uint,
  points-earned: uint,
  time-spent: uint
})

(define-map leaderboard-cache uint {
  student: principal,
  total-points: uint,
  rank: uint,
  last-updated: uint
})

;; Read-only functions
(define-read-only (get-user-progress (student principal))
  (map-get? user-progress student))

(define-read-only (get-module-info (module-id uint))
  (map-get? module-info module-id))

(define-read-only (get-course-modules (course-id uint))
  (default-to (list) (map-get? course-modules course-id)))

(define-read-only (has-completed-module (module-id uint) (student principal))
  (is-some (map-get? module-completions {module-id: module-id, student: student})))

(define-read-only (get-module-completion-data (module-id uint) (student principal))
  (map-get? module-completions {module-id: module-id, student: student}))

(define-read-only (get-student-rank (student principal))
  (let ((progress (get-user-progress student)))
    (match progress
      some-progress (get total-points some-progress)
      u0)))

(define-read-only (get-course-progress (course-id uint) (student principal))
  (let ((modules (get-course-modules course-id))
        (user-data (get-user-progress student)))
    (match user-data
      some-data
        (let ((completed (get completed-modules some-data)))
          {
            total-modules: (len modules),
            completed-modules: (len (filter is-module-completed modules)),
            completion-percentage: (if (> (len modules) u0)
              (/ (* (len (filter is-module-completed modules)) u100) (len modules))
              u0)
          })
      {total-modules: (len modules), completed-modules: u0, completion-percentage: u0})))

;; Helper function to check if module is completed
(define-private (is-module-completed (module-id uint))
  (has-completed-module module-id tx-sender))

(define-read-only (get-daily-activity (date uint) (student principal))
  (map-get? daily-activity {date: date, student: student}))

(define-read-only (get-total-stats)
  {
    total-students: (var-get total-students),
    total-modules-completed: (var-get total-modules-completed)
  })

;; Public functions

;; Create a new module
(define-public (create-module (module-id uint) (course-id uint) (name (string-ascii 50)) (description (string-ascii 200)) (points-reward uint) (difficulty uint) (estimated-time uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (map-set module-info module-id {
      course-id: course-id,
      name: name,
      description: description,
      points-reward: points-reward,
      difficulty: difficulty,
      estimated-time: estimated-time,
      is-active: true
    })
    
    ;; Add module to course
    (let ((current-modules (get-course-modules course-id)))
      (map-set course-modules course-id 
        (unwrap! (as-max-len? (append current-modules module-id) u50) (err u999))))
    
    (ok module-id)))

;; Complete a module
(define-public (complete-module (module-id uint) (time-spent uint) (score uint))
  (let ((module-data (unwrap! (map-get? module-info module-id) ERR_INVALID_MODULE))
        (current-progress (default-to 
          {completed-modules: (list), current-course: none, total-points: u0, current-streak: u0, last-activity: u0, skill-level: u1, total-time-spent: u0}
          (map-get? user-progress tx-sender)))
        (today (/ block-height u144))) ;; Approximate blocks per day
    
    ;; Check if module is active
    (asserts! (get is-active module-data) ERR_INVALID_MODULE)
    
    ;; Check if already completed
    (asserts! (is-none (map-get? module-completions {module-id: module-id, student: tx-sender})) ERR_MODULE_ALREADY_COMPLETED)
    
    ;; Record module completion
    (map-set module-completions {module-id: module-id, student: tx-sender} {
      completed-at: block-height,
      time-spent: time-spent,
      score: score,
      attempts: u1
    })
    
    ;; Update user progress
    (let ((new-completed-modules (unwrap! (as-max-len? 
            (append (get completed-modules current-progress) module-id) u100) 
            (err u999)))
          (new-points (+ (get total-points current-progress) (get points-reward module-data)))
          (new-streak (if (is-eq (get last-activity current-progress) (- block-height u144))
                        (+ (get current-streak current-progress) u1)
                        u1))
          (new-total-time (+ (get total-time-spent current-progress) time-spent)))
      
      (map-set user-progress tx-sender {
        completed-modules: new-completed-modules,
        current-course: (some (get course-id module-data)),
        total-points: new-points,
        current-streak: new-streak,
        last-activity: block-height,
        skill-level: (calculate-skill-level new-points),
        total-time-spent: new-total-time
      }))
    
    ;; Update daily activity
    (let ((current-daily (default-to 
            {modules-completed: u0, points-earned: u0, time-spent: u0}
            (map-get? daily-activity {date: today, student: tx-sender}))))
      (map-set daily-activity {date: today, student: tx-sender} {
        modules-completed: (+ (get modules-completed current-daily) u1),
        points-earned: (+ (get points-earned current-daily) (get points-reward module-data)),
        time-spent: (+ (get time-spent current-daily) time-spent)
      }))
    
    ;; Update global stats
    (var-set total-modules-completed (+ (var-get total-modules-completed) u1))
    
    ;; Check if this is a new student
    (if (is-none (map-get? user-progress tx-sender))
      (var-set total-students (+ (var-get total-students) u1))
      true)
    
    (ok {
      points-earned: (get points-reward module-data),
      new-total-points: (+ (get total-points current-progress) (get points-reward module-data)),
      streak: (if (is-eq (get last-activity current-progress) (- block-height u144))
                (+ (get current-streak current-progress) u1)
                u1)
    })))

;; Update module status
(define-public (update-module-status (module-id uint) (is-active bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (asserts! (is-some (map-get? module-info module-id)) ERR_INVALID_MODULE)
    (let ((module-data (unwrap! (map-get? module-info module-id) ERR_INVALID_MODULE)))
      (map-set module-info module-id (merge module-data {is-active: is-active}))
      (ok true))))

;; Reset user progress (admin function)
(define-public (reset-user-progress (student principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (map-delete user-progress student)
    (ok true)))

;; Helper function to calculate skill level based on points
(define-private (calculate-skill-level (points uint))
  (if (< points u100) u1      ;; Beginner
  (if (< points u500) u2      ;; Intermediate  
  (if (< points u1000) u3     ;; Advanced
  u4))))                      ;; Expert

;; Batch complete modules (for testing/admin)
(define-public (batch-complete-modules (module-ids (list 10 uint)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (ok (len module-ids))))
