;; Bitcoin Developer Academy - Certificate NFT Contract
;; This contract manages the issuance and tracking of educational certificates as NFTs

;; Define the NFT
(define-non-fungible-token dev-certificate uint)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_OWNER_ONLY (err u100))
(define-constant ERR_NOT_TOKEN_OWNER (err u101))
(define-constant ERR_INVALID_COURSE (err u102))
(define-constant ERR_ALREADY_CERTIFIED (err u103))
(define-constant ERR_INVALID_SKILL_LEVEL (err u104))

;; Data Variables
(define-data-var certificate-counter uint u0)
(define-data-var contract-uri (string-ascii 256) "https://bitcoindevacademy.com/api/certificates/")

;; Data Maps
(define-map certificate-data uint {
  course-id: uint,
  student: principal,
  completion-date: uint,
  skill-level: uint,
  ipfs-metadata: (string-ascii 100),
  instructor: principal
})

(define-map course-info uint {
  name: (string-ascii 50),
  description: (string-ascii 200),
  difficulty: uint,
  is-active: bool
})

(define-map student-certificates principal (list 50 uint))
(define-map course-completions {course-id: uint, student: principal} uint)

;; Read-only functions
(define-read-only (get-last-token-id)
  (var-get certificate-counter))

(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (var-get contract-uri) (uint-to-ascii token-id)))))

(define-read-only (get-certificate-data (token-id uint))
  (map-get? certificate-data token-id))

(define-read-only (get-course-info (course-id uint))
  (map-get? course-info course-id))

(define-read-only (get-student-certificates (student principal))
  (default-to (list) (map-get? student-certificates student)))

(define-read-only (has-completed-course (course-id uint) (student principal))
  (is-some (map-get? course-completions {course-id: course-id, student: student})))

(define-read-only (get-certificate-count-for-course (course-id uint))
  (let ((course-data (map-get? course-info course-id)))
    (if (is-some course-data)
      (ok (len (filter is-course-certificate (map get-certificate-data (generate-certificate-list)))))
      (err ERR_INVALID_COURSE))))

;; Helper function to generate list of certificate IDs
(define-private (generate-certificate-list)
  (map + (list u1 u2 u3 u4 u5 u6 u7 u8 u9 u10) (list u0 u0 u0 u0 u0 u0 u0 u0 u0 u0)))

;; Helper function to check if certificate belongs to course
(define-private (is-course-certificate (cert-data (optional {course-id: uint, student: principal, completion-date: uint, skill-level: uint, ipfs-metadata: (string-ascii 100), instructor: principal})))
  (match cert-data
    some-cert true
    false))

;; Public functions

;; Initialize a new course
(define-public (create-course (course-id uint) (name (string-ascii 50)) (description (string-ascii 200)) (difficulty uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (asserts! (and (>= difficulty u1) (<= difficulty u4)) ERR_INVALID_SKILL_LEVEL)
    (map-set course-info course-id {
      name: name,
      description: description,
      difficulty: difficulty,
      is-active: true
    })
    (ok course-id)))

;; Mint a certificate for course completion
(define-public (mint-certificate (recipient principal) (course-id uint) (skill-level uint) (metadata (string-ascii 100)))
  (let ((certificate-id (+ (var-get certificate-counter) u1)))
    (begin
      ;; Validate inputs
      (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
      (asserts! (and (>= skill-level u1) (<= skill-level u4)) ERR_INVALID_SKILL_LEVEL)
      (asserts! (is-some (map-get? course-info course-id)) ERR_INVALID_COURSE)
      (asserts! (is-none (map-get? course-completions {course-id: course-id, student: recipient})) ERR_ALREADY_CERTIFIED)
      
      ;; Mint the NFT
      (try! (nft-mint? dev-certificate certificate-id recipient))
      
      ;; Store certificate data
      (map-set certificate-data certificate-id {
        course-id: course-id,
        student: recipient,
        completion-date: block-height,
        skill-level: skill-level,
        ipfs-metadata: metadata,
        instructor: tx-sender
      })
      
      ;; Update student's certificate list
      (let ((current-certs (get-student-certificates recipient)))
        (map-set student-certificates recipient 
          (unwrap! (as-max-len? (append current-certs certificate-id) u50) (err u999))))
      
      ;; Mark course as completed for this student
      (map-set course-completions {course-id: course-id, student: recipient} certificate-id)
      
      ;; Update counter
      (var-set certificate-counter certificate-id)
      
      (ok certificate-id))))

;; Transfer certificate (standard NFT transfer)
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_TOKEN_OWNER)
    (try! (nft-transfer? dev-certificate token-id sender recipient))
    (ok true)))

;; Update course status
(define-public (update-course-status (course-id uint) (is-active bool))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (asserts! (is-some (map-get? course-info course-id)) ERR_INVALID_COURSE)
    (let ((course-data (unwrap! (map-get? course-info course-id) ERR_INVALID_COURSE)))
      (map-set course-info course-id (merge course-data {is-active: is-active}))
      (ok true))))

;; Update contract URI
(define-public (set-contract-uri (new-uri (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_OWNER_ONLY)
    (var-set contract-uri new-uri)
    (ok true)))

;; Helper function to convert uint to ascii (simplified version)
(define-private (uint-to-ascii (value uint))
  (if (is-eq value u0) "0"
  (if (is-eq value u1) "1"
  (if (is-eq value u2) "2"
  (if (is-eq value u3) "3"
  (if (is-eq value u4) "4"
  (if (is-eq value u5) "5"
  (if (is-eq value u6) "6"
  (if (is-eq value u7) "7"
  (if (is-eq value u8) "8"
  (if (is-eq value u9) "9"
  "unknown")))))))))))
