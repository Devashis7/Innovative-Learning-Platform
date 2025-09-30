# 🛠 Workflow Design  (Student + Admin)

---

## 1. User Roles

* **Admin** (single):

  * Creates/edits courses (Course → Units → Topics → Subtopics).
  * Adds learning resources (YouTube links, notes).
  * Manages student accounts (create/update/delete).

* **Student**:

  * Views all available courses.
  * Opens structured content (Unit → Topic → Subtopic).
  * Marks subtopics as **complete**.
  * Sees progress meter (percentage complete per course).

---

## 2. Course Structure Workflow

```
Course
 └── Unit
      └── Topic
           └── Subtopic (lowest level, has content)
```

* **Admin adds Course** → inside it, creates **Units** → each Unit has **Topics** → each Topic has **Subtopics**.
* **Subtopic is the atomic learning element** → each has content:

  * YouTube link OR
  * Online note (PDF/text).

---

## 3. Progress Tracking Workflow

* Every **Subtopic** is a “checkable task”.
* Student marks it **complete**.
* System stores a record in `Progress` collection.
* Completion is calculated like this:

```
progressPercentage = (Completed Subtopics / Total Subtopics in Course) × 100
```

* Shown as a **meter (progress bar)** in the Student Dashboard.

---

## 4. High-Level Feature Flow

### **Admin Workflow**

1. Login → Admin Dashboard.
2. Create a new Course → add Units → add Topics → add Subtopics.
3. Attach resources (YouTube link, notes).
4. View list of students & their progress.

### **Student Workflow**

1. Login → Student Dashboard.
2. See list of Courses → each has a **progress bar**.
3. Click Course → expand Units → Topics → Subtopics.
4. Open subtopic → view resource.
5. Mark subtopic as **complete** → updates progress bar.

---

## 5. Backend Flow (API Level)

1. **Auth**

   * `POST /auth/login` (student/admin)
   * `POST /auth/register` (student only, admin manually creates own account)

2. **Course Management (Admin only)**

   * `POST /courses` (create course with nested structure)
   * `PUT /courses/:id` (edit course)
   * `GET /courses` (list all courses)
   * `GET /courses/:id` (get one course with units/topics/subtopics)
   * `DELETE /courses/:id` (delete course)

3. **Progress Management (Student only)**

   * `POST /progress/mark` (mark/unmark subtopic complete)
   * `GET /progress/course/:courseId/:userId` (get percentage complete for a course)

---

## 6. Data Flow Example (Progress)

1. Admin creates **DBMS Course** with:

   * 2 Units → 3 Topics each → 2 Subtopics each = 12 subtopics total.

2. Student logs in → sees **DBMS Course (0% complete)**.

3. Student opens 1 subtopic → clicks “Mark Complete”.

   * System saves `{ userId, courseId, subtopicId, completed: true }`.

4. Backend recalculates →

   * Completed = 1, Total = 12 → Progress = 8.3%.

5. Student dashboard updates meter → **DBMS: 8% Complete**.

---

## 7. Frontend Design Notes

### **Student Dashboard**

* Card for each course → show title, description, and **progress bar**.
* On click → open course structure:

  * Accordion style: Unit → expand to Topics → expand to Subtopics.
  * Each Subtopic has a checkbox (completed or not).

### **Admin Dashboard**

* Sidebar: Manage Courses, Manage Students.
* Add/Edit Course UI with nested forms (Unit → Topic → Subtopic).
* Option to attach resource links (YouTube URL, Notes).
* View students’ progress in a simple table.

---

## 8. Deployment Plan

* **Frontend** → Vercel/Netlify (free).
* **Backend** → Render/Heroku (free tier).
* **Database** → MongoDB Atlas free tier.

🗄️ Subtopic Model Update

Instead of storing a single content type, we’ll allow **multiple resources per subtopic**.

```js
Subtopic {
  _id: ObjectId,
  title: String,
  resources: [
    {
      type: "youtube" | "note",
      link: String,         // YouTube URL or note link
      description: String   // optional (e.g., “Lecture 1 notes”)
    }
  ]
}
```

### Example Subtopic:

```json
{
  "title": "Normalization in DBMS",
  "resources": [
    {
      "type": "youtube",
      "link": "https://youtube.com/watch?v=abc123",
      "description": "Lecture video on normalization"
    },
    {
      "type": "note",
      "link": "https://drive.google.com/abcxyz",
      "description": "PDF notes for normalization"
    }
  ]
}
```
